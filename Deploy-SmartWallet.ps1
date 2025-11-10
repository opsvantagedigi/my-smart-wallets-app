# Deploy-SmartWallet.ps1
# Author: Ajay Sidal & Marz
# Purpose: Zip and deploy Smart Wallet app to Azure with legacy precision

# Step 1: Set variables
$projectRoot = "C:\Users\AjaySidal\my-smart-wallets-app"
$zipPath = "$projectRoot\smart-wallets-deploy.zip"
$webAppName = "sanctuary-portal"
$resourceGroup = "opsvantage-production"

Write-Host "Starting Smart Wallet deployment ritual..." -ForegroundColor Cyan

# Step 2: Navigate to project root
Set-Location $projectRoot

# Step 3: Clean previous zip if exists
if (Test-Path $zipPath) {
    Remove-Item $zipPath
    Write-Host "Previous zip removed." -ForegroundColor Yellow
}

# Step 4: Install production dependencies and build the app
# Install only production dependencies so the runtime 'next' binary is available
Write-Host "Installing production dependencies and building..." -ForegroundColor Cyan
# clean any existing node_modules to ensure a consistent package install
if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" }
# install only production dependencies (includes next since it's in dependencies)
npm ci --omit=dev
npm run build

# Step 5: Create deployment zip (include node_modules so the runtime has 'next')
Write-Host "Creating deployment zip (including node_modules)..." -ForegroundColor Cyan
# Ensure package-lock.json exists for reproducible deployments
if (-not (Test-Path "package-lock.json")) { npm i --package-lock-only }
Compress-Archive -Path ".next","public","package.json","package-lock.json","node_modules" -DestinationPath $zipPath -Force

# Step 6: Deploy to Azure
Write-Host "Deploying to Azure Web App..." -ForegroundColor Cyan
az webapp deploy --name $webAppName --resource-group $resourceGroup --src-path $zipPath --type zip

# Step 7: Stream logs
Write-Host "Streaming logs..." -ForegroundColor Cyan
az webapp log tail --name $webAppName --resource-group $resourceGroup