param(
    [string]$Repo = 'opsvantagedigi/my-smart-wallets-app',
    [string]$Branch = 'chore/remediate/sanity-secrets',
    [int]$PollIntervalSeconds = 10,
    [int]$TimeoutMinutes = 30
)

function ExitWith($code, $msg) {
    Write-Error $msg
    exit $code
}

# Ensure gh is available
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    ExitWith 2 "gh CLI not found in PATH. Install and authenticate with 'gh auth login' before running this script."
}

Write-Host "Repo: $Repo" -ForegroundColor Cyan
Write-Host "Branch: $Branch" -ForegroundColor Cyan

# Get latest run id for the branch
$runId = gh run list --repo $Repo --branch $Branch --limit 1 --json databaseId -q '.[0].databaseId' 2>$null
if (-not $runId) {
    ExitWith 3 "No workflow run found for branch '$Branch' in repository '$Repo'."
}

Write-Host "Latest run id: $runId" -ForegroundColor Green

$start = Get-Date
while ($true) {
    # Query status
    $status = gh run view $runId --repo $Repo --json status -q '.status' 2>$null
    if (-not $status) {
        Write-Host "Unable to fetch status for run $runId. Retrying in $PollIntervalSeconds seconds..." -ForegroundColor Yellow
    } else {
        Write-Host "Run $runId status: $status" -ForegroundColor Yellow
        if ($status -eq 'completed') { break }
    }

    if ((Get-Date) - $start -gt (New-TimeSpan -Minutes $TimeoutMinutes)) {
        ExitWith 4 "Timed out waiting for run $runId to complete after $TimeoutMinutes minutes."
    }
    Start-Sleep -Seconds $PollIntervalSeconds
}

Write-Host "Run $runId completed — fetching logs..." -ForegroundColor Green

# Save logs to a timestamped file
$timestamp = (Get-Date).ToString('yyyyMMdd-HHmmss')
$logFile = "gh-run-$runId-$timestamp.log"
try {
    gh run view $runId --repo $Repo --log | Tee-Object -FilePath $logFile -Encoding UTF8
} catch {
    ExitWith 5 "Failed to fetch logs for run $runId: $_"
}

Write-Host "Logs saved to: $logFile" -ForegroundColor Green

# Analyze run conclusion and failing jobs
$runJson = gh run view $runId --repo $Repo --json conclusion,jobs 2>$null | ConvertFrom-Json
if (-not $runJson) { ExitWith 6 "Failed to parse run metadata for $runId." }

$conclusion = $runJson.conclusion
if ($conclusion -eq 'success') {
    Write-Host "CI Conclusion: success" -ForegroundColor Green
    exit 0
} else {
    Write-Host "CI Conclusion: $conclusion" -ForegroundColor Red
    # Find failed jobs
    $failed = @()
    if ($runJson.jobs) {
        foreach ($j in $runJson.jobs) {
            if ($j.conclusion -ne 'success') {
                $failed += [PSCustomObject]@{ name = $j.name; conclusion = $j.conclusion }
            }
        }
    }

    if ($failed.Count -gt 0) {
        Write-Host "Failed jobs:" -ForegroundColor Red
        foreach ($f in $failed) { Write-Host " - $($f.name): $($f.conclusion)" }
    } else {
        Write-Host "No failed jobs detected in metadata, but overall conclusion: $conclusion" -ForegroundColor Yellow
    }

    Write-Host "Review the log file '$logFile' for error excerpts." -ForegroundColor Cyan
    exit 7
}
