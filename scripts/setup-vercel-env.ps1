Param(
  [string]$Scope = "production"
)

Write-Host "This script will help you add required environment variables to Vercel ($Scope)." -ForegroundColor Cyan
Write-Host "Ensure you are logged in (vercel login) and the project is linked (vercel link)." -ForegroundColor Yellow

$vars = @(
  @{ name = 'NEXT_PUBLIC_ALCHEMY_API_KEY'; prompt = 'Alchemy API Key' },
  @{ name = 'NEXT_PUBLIC_ALCHEMY_POLICY_ID'; prompt = 'Alchemy Sponsorship Policy ID' },
  @{ name = 'NEXT_PUBLIC_CHAIN_ID'; prompt = 'Chain ID (e.g., 11155111 for Sepolia)'; default = '11155111' },
  @{ name = 'NEXT_PUBLIC_ALCHEMY_RPC_URL'; prompt = 'Alchemy RPC URL (Sepolia)'; example = 'https://eth-sepolia.g.alchemy.com/v2/<your-key>' },
  @{ name = 'NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID'; prompt = 'WalletConnect Project ID' },
  @{ name = 'NEXT_PUBLIC_EMBEDDED_WALLET_ENABLED'; prompt = 'Embedded Wallet Enabled (true/false)'; default = 'true' },
  @{ name = 'JWT_SECRET'; prompt = 'JWT Secret (strong value)' }
)

foreach ($v in $vars) {
  $default = $v.default
  $value = Read-Host ("Enter value for " + $v.name + $(if ($default) { " [default: $default]" } else { '' }))
  if (-not $value -and $default) { $value = $default }
  if (-not $value) { Write-Host "Skipped $($v.name) (no value)" -ForegroundColor Yellow; continue }
  Write-Host "Adding $($v.name) to Vercel ($Scope)" -ForegroundColor Green
  # Note: vercel env add is interactive; we invoke it and then pipe the value to stdin.
  # PowerShell piping of strings to CLI works across platforms.
  $value | vercel env add $($v.name) $Scope
}

Write-Host "Done. You can verify values with: vercel env ls" -ForegroundColor Cyan