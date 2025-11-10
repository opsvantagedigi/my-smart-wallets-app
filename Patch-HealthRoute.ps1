# Patch-HealthRoute.ps1
# Ensures /api/health exists, builds, zips, deploys app to Azure and tails logs briefly

param(
  [string]$projectRoot = "C:\Users\AjaySidal\my-smart-wallets-app",
  [string]$webAppName = "sanctuary-portal",
  [string]$resourceGroup = "opsvantage-production",
  [int]$logTailSeconds = 30
)

Write-Host "Starting Patch-HealthRoute ritual..." -ForegroundColor Cyan

# 1. Ensure health route file exists (app router)
$healthPath = Join-Path $projectRoot "app\api\health\route.ts"
if (!(Test-Path (Split-Path $healthPath))) {
    New-Item -ItemType Directory -Path (Split-Path $healthPath) -Force | Out-Null
}

$healthContent = @"
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'Healthy' });
}
"@

Set-Content -Path $healthPath -Value $healthContent -Force
Write-Host "Ensured health endpoint at app/api/health/route.ts" -ForegroundColor Green

# 2. Build the app
Set-Location $projectRoot
Write-Host "Running npm install..." -ForegroundColor Cyan
npm install
Write-Host "Running npm run build..." -ForegroundColor Cyan
npm run build

# 3. Create deployment zip
$zipPath = Join-Path $projectRoot "smart-wallets-deploy.zip"
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
Write-Host "Creating deployment zip..." -ForegroundColor Cyan
Compress-Archive -Path ".next","public","package.json","package-lock.json" -DestinationPath $zipPath -Force
Write-Host "Zip created at $zipPath" -ForegroundColor Green

# 4. Deploy to Azure
Write-Host "Deploying to Azure Web App $webAppName in $resourceGroup..." -ForegroundColor Cyan
az webapp deploy --name $webAppName --resource-group $resourceGroup --src-path $zipPath --type zip

# 5. Restart app
Write-Host "Restarting web app to pick up deployment..." -ForegroundColor Cyan
az webapp restart --name $webAppName --resource-group $resourceGroup

# 6. Tail logs for a short period
Write-Host "Tailing logs for $logTailSeconds seconds..." -ForegroundColor Cyan
$proc = Start-Process -FilePath "az" -ArgumentList "webapp log tail --name $webAppName --resource-group $resourceGroup" -NoNewWindow -PassThru
Start-Sleep -Seconds $logTailSeconds
if (-not $proc.HasExited) {
    try { Stop-Process -Id $proc.Id -Force } catch { }
}

# 7. Verify health endpoint from CLI
Write-Host "Checking deployed health endpoint..." -ForegroundColor Cyan
try {
    $resp = curl -s "https://$webAppName.azurewebsites.net/api/health" -UseBasicParsing
    Write-Host "Health endpoint response:" -ForegroundColor Green
    Write-Host $resp
} catch {
    Write-Host "Failed to call health endpoint via curl." -ForegroundColor Yellow
}

Write-Host "Patch-HealthRoute completed." -ForegroundColor Cyan
