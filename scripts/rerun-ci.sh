#!/usr/bin/env bash
set -euo pipefail

# Re-run the last failed GitHub Actions workflow for a branch using the GitHub CLI.
# Usage: ./scripts/rerun-ci.sh [branch]
# Default branch: chore/remediate/sanity-secrets

BRANCH=${1:-chore/remediate/sanity-secrets}

if ! command -v gh >/dev/null 2>&1; then
  echo "Error: GitHub CLI (gh) is required. Install from https://cli.github.com/"
  exit 1
fi

echo "Looking up recent workflow runs for branch: $BRANCH"

# Try to locate the last failed or cancelled run using gh's JSON output and jq if available
RUN_ID=""
if command -v jq >/dev/null 2>&1; then
  RUN_ID=$(gh run list --branch "$BRANCH" --limit 50 --json id,conclusion --jq '.[] | select(.conclusion=="failure" or .conclusion=="cancelled") | .id' | head -n1)
else
  # Fallback: parse plain text output to find a run id that looks failed
  RUN_ID=$(gh run list --branch "$BRANCH" --limit 50 | awk '/failed|failure|cancelled|cancelled/{print $1; exit}') || true
fi

if [ -z "$RUN_ID" ]; then
  echo "No failed workflow run automatically detected for branch '$BRANCH'."
  echo "Showing recent runs -- please pick an ID to rerun (copy the numeric ID):"
  gh run list --branch "$BRANCH" --limit 20
  read -r -p "Enter run ID to rerun (or press Enter to abort): " PICKED
  if [ -z "$PICKED" ]; then
    echo "Abort. No run rerun."
    exit 0
  fi
  RUN_ID=$PICKED
fi

echo "Re-running workflow run id: $RUN_ID"
gh run rerun "$RUN_ID"

echo "Requested rerun for run id $RUN_ID. Monitor progress in GitHub Actions UI or with 'gh run watch $RUN_ID'"
