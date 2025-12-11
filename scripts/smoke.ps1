Param(
  [string]$BaseUrl = "https://my-smart-wallets-6rtd4xfcm-ajay-sidals-projects-132aa3d1.vercel.app",
  [string]$AuthToken = ""
)

function Test-Endpoint($path, $method = 'GET', $body = $null) {
  $url = "$BaseUrl$path"
  $headers = @{}
  if ($AuthToken -and $AuthToken.Length -gt 0) {
    $headers["Authorization"] = "Bearer $AuthToken"
    $headers["Cookie"] = "auth_token=$AuthToken"
  }
  try {
    if ($method -eq 'GET') {
      $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -Headers $headers -ErrorAction Stop
      "$method $path -> $($resp.StatusCode)"
    } else {
      $json = if ($body) { $body | ConvertTo-Json } else { '{}' }
      $resp = Invoke-RestMethod -Uri $url -Method $method -Body $json -ContentType 'application/json' -Headers $headers -ErrorAction Stop
      "$method $path -> 200 ($($resp | ConvertTo-Json -Depth 4))"
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

# Protected/API (auth flow)
Test-Endpoint '/api/auth/login' 'POST' (@{ email = 'test@example.com' })
Test-Endpoint '/api/auth/signup' 'POST' (@{ email = 'new@example.com'; name = 'Test' })
Test-Endpoint '/api/auth/user' 'GET'
Test-Endpoint '/api/auth/logout' 'POST' (@{})

Write-Host "Smoke tests complete." -ForegroundColor Green