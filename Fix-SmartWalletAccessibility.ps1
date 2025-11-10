# Fix-SmartWalletAccessibility.ps1
# Author: Ajay Sidal & Marz
# Purpose: Patch accessibility, compatibility, and startup metadata for Azure deployment

# Step 1: Set variables
$projectRoot = "C:\Users\AjaySidal\my-smart-wallets-app"
$documentPath = "$projectRoot\app\_document.tsx"
$zipPath = "$projectRoot\smart-wallets-deploy.zip"
$webAppName = "sanctuary-portal"
$resourceGroup = "opsvantage-production"

Write-Host "🧠 Starting accessibility patch ritual..." -ForegroundColor Cyan

# Step 2: Inject _document.tsx content
$documentContent = @"
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang=\"en\">
      <Head>
        <meta charSet=\"UTF-8\" />
        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
        <meta httpEquiv=\"X-UA-Compatible\" content=\"IE=edge\" />
        <title>Sanctuary Portal</title>
        <meta name=\"description\" content=\"Smart Wallet Sanctuary Portal by OpsVantage Digital\" />
        <meta name=\"theme-color\" content=\"#000000\" />
        <meta name=\"robots\" content=\"index, follow\" />
        <meta httpEquiv=\"Content-Security-Policy\" content=\"default-src 'self'; script-src 'self'; object-src 'none';\" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
"@

Set-Content -Path $documentPath -Value $documentContent -Force
Write-Host "✅ _document.tsx updated with accessibility and CSP metadata." -ForegroundColor Green

# Step 3: Rebuild the app
Set-Location $projectRoot
Write-Host "🔧 Running build..." -ForegroundColor Cyan
npm install
npm run build

# Step 4: Zip the build
if (Test-Path $zipPath) {
    Remove-Item $zipPath
    Write-Host "🧹 Previous zip removed." -ForegroundColor Yellow
}
Compress-Archive -Path ".next","public","package.json","package-lock.json" -DestinationPath $zipPath
Write-Host "📦 Deployment zip created." -ForegroundColor Green

# Step 5: Deploy to Azure
Write-Host "🚀 Deploying to Azure Web App..." -ForegroundColor Cyan
az webapp deploy --name $webAppName --resource-group $resourceGroup --src-path $zipPath --type zip

# Step 6: Stream logs
Write-Host "Streaming logs..." -ForegroundColor Cyan
az webapp log tail --name $webAppName --resource-group $resourceGroup
