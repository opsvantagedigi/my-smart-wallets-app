Param(
  [string]$BaseUrl = "https://my-smart-wallets-6rtd4xfcm-ajay-sidals-projects-132aa3d1.vercel.app",
  [string]$AuthToken = ""
)

function Test-Endpoint($path, $method = 'GET', $body = $null, $session = $null) {
  $url = "$BaseUrl$path"
  $headers = @{}
  if ($AuthToken -and $AuthToken.Length -gt 0) {
    $headers["Authorization"] = "Bearer $AuthToken"
  }
  try {
    if ($method -eq 'GET') {
      if ($session) {
        $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -Headers $headers -WebSession $session -ErrorAction Stop
      } else {
        $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -Headers $headers -ErrorAction Stop
      }
      "$method $path -> $($resp.StatusCode)"
    } else {
      $json = if ($body) { $body | ConvertTo-Json } else { '{}' }
      if ($session) {
        $resp = Invoke-WebRequest -Uri $url -Method $method -Body $json -ContentType 'application/json' -Headers $headers -WebSession $session -ErrorAction Stop
      } else {
        $resp = Invoke-WebRequest -Uri $url -Method $method -Body $json -ContentType 'application/json' -Headers $headers -ErrorAction Stop
      }
      "$method $path -> $($resp.StatusCode)"
    }
  } catch {
    "$method $path -> FAILED: $($_.Exception.Message)"
  }
}

Write-Host "Running smoke tests against $BaseUrl" -ForegroundColor Cyan

# Public Pages (should be 200 without auth)
Test-Endpoint '/' 'GET'
Test-Endpoint '/about' 'GET'
Test-Endpoint '/contact' 'GET'
Test-Endpoint '/api/health' 'GET'

<# Establish a session to persist cookies across auth calls #>
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession

# Protected/API (auth flow)
Test-Endpoint '/api/auth/login' 'POST' (@{ email = 'test@example.com' }) $session
Test-Endpoint '/api/auth/signup' 'POST' (@{ email = 'new@example.com'; name = 'Test User' }) $session
Test-Endpoint '/api/auth/me' 'GET' $null $session
Test-Endpoint '/api/auth/user' 'GET' $null $session
Test-Endpoint '/api/auth/logout' 'POST' (@{}) $session

Write-Host "Smoke tests complete." -ForegroundColor Green