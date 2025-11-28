<#
PowerShell script to stage, commit, and push pending changes to a branch.
Usage: pwsh ./scripts/push-changes.ps1 [-Branch <branchName>]
Default branch: chore/remediate/sanity-secrets
#>

param(
    [string]$Branch = 'chore/remediate/sanity-secrets',
    [switch]$DryRun
)

try {
    $current = git rev-parse --abbrev-ref HEAD
} catch {
    Write-Error "Not a git repository or git not available."
    exit 1
}

Write-Output "Current branch: $current"
if ($current -ne $Branch) {
    Write-Output "Switching to branch $Branch"
    git checkout $Branch
}

Write-Output "Staging all changes (excluding .env.local)..."
git add .

# Ensure we do not accidentally commit local env files
if (Test-Path .env.local) {
    git reset -- .env.local | Out-Null
}

if ($DryRun) {
    Write-Output "\n🔎 Dry run: showing git status and staged diff"
    git status --short
    Write-Output "\n--- Staged diff ---"
    git --no-pager diff --cached
    Write-Output "\nDry run complete. No changes were committed or pushed."
    exit 0
}

$staged = git diff --cached --name-only
if (-not $staged) {
    Write-Output "No staged changes to commit. Nothing to push."
    exit 0
}

Write-Output "Staged files:"
git --no-pager diff --cached --name-only

$ans = Read-Host "Commit and push all staged changes to $Branch? (y/N)"
if ($ans -match '^[yY](es)?$') {
    Write-Output "Committing..."
    git commit -m "chore: commit pending change control updates"
    Write-Output "Pushing to origin/$Branch..."
    git push origin $Branch
    Write-Output "✅ Changes pushed. The push will trigger GitHub Actions for this branch/PR."
} else {
    Write-Output "Aborted by user. No commit/push performed."
    exit 0
}

if (Get-Command gh -ErrorAction SilentlyContinue) {
    Write-Output "Listing recent workflow runs for branch $Branch (last 5):"
    gh run list --branch $Branch --limit 5
    Write-Output "Use: gh run view <id> --log to inspect logs for a run id."
} else {
    Write-Output "GitHub CLI (gh) not found. Open the GitHub Actions UI to inspect runs and logs."
}

Write-Output "Done."
