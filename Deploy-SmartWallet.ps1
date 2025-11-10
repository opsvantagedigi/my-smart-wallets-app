# Deploy-SmartWallet.ps1
# Author: Ajay Sidal & Marz
# Purpose: Zip and deploy Smart Wallet app to Azure with legacy precision

# Step 1: Set variables
$projectRoot = "C:\Users\AjaySidal\my-smart-wallets-app"
$zipPath = "$projectRoot\smart-wallets-deploy.zip"
$webAppName = "sanctuary-portal"
$resourceGroup = "DefaultResourceGroup-EAU"

Write-Host "Starting Smart Wallet deployment ritual..." -ForegroundColor Cyan

# Step 2: Navigate to project root
Set-Location $projectRoot

# Step 3: Clean previous zip if exists
if (Test-Path $zipPath) {
    Remove-Item $zipPath
    Write-Host "Previous zip removed." -ForegroundColor Yellow
}

# Step 4: Build the app
Write-Host "Running build..." -ForegroundColor Cyan
npm install
npm run build

# Step 5: Create deployment zip
Write-Host "Creating deployment zip..." -ForegroundColor Cyan
Compress-Archive -Path ".next","public","package.json","package-lock.json" -DestinationPath $zipPath

# Step 6: Deploy to Azure
Write-Host "Deploying to Azure Web App..." -ForegroundColor Cyan
az webapp deploy --name $webAppName --resource-group $resourceGroup --src-path $zipPath --type zip

# Step 7: Stream logs
Write-Host "Streaming logs..." -ForegroundColor Cyan
az webapp log tail --name $webAppName --resource-group $resourceGroup