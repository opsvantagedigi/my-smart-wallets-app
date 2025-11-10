# Patch-HealthRoute.ps1
# Ensures /api/health exists, builds, zips, deploys, restarts, and verifies health on Azure

$projectRoot = "C:\Users\AjaySidal\my-smart-wallets-app"
$webAppName = "sanctuary-portal"
$resourceGroup = "opsvantage-production"
$zipPath = "$projectRoot\smart-wallets-deploy.zip"
$healthRoutePath = "$projectRoot\app\api\health\route.ts"

Write-Host "Starting Patch-HealthRoute ritual..." -ForegroundColor Cyan

# Ensure project root
Set-Location $projectRoot

# 1) Ensure health route file exists with a safe implementation
$healthContent = @"
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'Healthy' });
}
"@

if (-not (Test-Path (Split-Path $healthRoutePath -Parent))) {
    New-Item -ItemType Directory -Path (Split-Path $healthRoutePath -Parent) -Force | Out-Null
}

Set-Content -Path $healthRoutePath -Value $healthContent -Force
Write-Host "Ensured health route at /app/api/health/route.ts" -ForegroundColor Green

# 2) Install production deps and build
Write-Host "Installing production dependencies and building..." -ForegroundColor Cyan
if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" }
# Use npm ci --omit=dev for reproducible installs
npm ci --omit=dev
$buildResult = npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Aborting deployment." -ForegroundColor Red
    exit 1
}

# 3) Create deployment zip (include node_modules so next runtime exists)
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
if (-not (Test-Path "package-lock.json")) { npm i --package-lock-only }
Write-Host "Creating deployment zip..." -ForegroundColor Cyan
Compress-Archive -Path ".next","public","package.json","package-lock.json","node_modules" -DestinationPath $zipPath -Force

# 4) Deploy to Azure
Write-Host "Deploying to Azure Web App $webAppName in $resourceGroup..." -ForegroundColor Cyan
$deploy = az webapp deploy --name $webAppName --resource-group $resourceGroup --src-path $zipPath --type zip
if ($LASTEXITCODE -ne 0) {
    Write-Host "az webapp deploy failed." -ForegroundColor Red
    exit 1
}

# 5) Restart the app to ensure process restarts
Write-Host "Restarting web app..." -ForegroundColor Cyan
az webapp restart --name $webAppName --resource-group $resourceGroup

# 6) Wait and poll health endpoint
$healthUrl = "https://$webAppName.azurewebsites.net/api/health"
Write-Host "Polling health endpoint: $healthUrl" -ForegroundColor Cyan
$maxAttempts = 12
$attempt = 0
$healthy = $false
while ($attempt -lt $maxAttempts) {
    Start-Sleep -Seconds 5
    try {
        $resp = curl -s $healthUrl
        if ($resp -and $resp -match 'Healthy') {
            Write-Host "Health check passed: $resp" -ForegroundColor Green
            $healthy = $true
            break
        } else {
            Write-Host "Attempt $($attempt+1): unhealthy or no response yet..." -ForegroundColor Yellow
        }
    } catch {
        Write-Host "Attempt $($attempt+1): error contacting health endpoint." -ForegroundColor Yellow
    }
    $attempt++
}

if (-not $healthy) {
    Write-Host "Health check failed after polling. Fetching recent logs via Kudu detector URL..." -ForegroundColor Red
    Write-Host "Kudu diagnostics: https://$webAppName.scm.azurewebsites.net/detectors" -ForegroundColor Cyan
    exit 1
}

Write-Host "Deployment and health verification succeeded." -ForegroundColor Green
exit 0
