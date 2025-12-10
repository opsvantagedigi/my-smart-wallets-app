#!/usr/bin/env bash
set -euo pipefail

missing=()

require() {
  local name=$1
  if [ -z "${!name:-}" ]; then
    missing+=("$name")
  fi
}

# Required in build/deploy context
require NEXT_PUBLIC_ALCHEMY_API_KEY
require NEXT_PUBLIC_ALCHEMY_POLICY_ID
require NEXT_PUBLIC_CHAIN_ID
require NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
require NEXT_PUBLIC_EMBEDDED_WALLET_ENABLED
require NEXT_PUBLIC_APP_URL
require JWT_SECRET
require CORS_ORIGIN

# Optional: RPC URL (if proxying instead of API key transport)
# require NEXT_PUBLIC_ALCHEMY_RPC_URL

if [ ${#missing[@]} -gt 0 ]; then
  echo "Missing required environment variables:" >&2
  for var in "${missing[@]}"; do
    echo "- $var" >&2
  done
  echo "Failing fast. Set these in Vercel envs and CI secrets." >&2
  exit 1
fi

echo "Environment validation passed." 