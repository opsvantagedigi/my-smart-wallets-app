#!/usr/bin/env bash
set -euo pipefail

# Enhanced push script
# Usage: ./scripts/push-changes.sh [--dry-run] [branch]
# Default branch: chore/remediate/sanity-secrets

DRY_RUN=0
BRANCH="chore/remediate/sanity-secrets"

while [[ "$#" -gt 0 ]]; do
  case "$1" in
    --dry-run|-n)
      DRY_RUN=1; shift ;;
    --branch)
      BRANCH="$2"; shift 2 ;;
    *)
      # allow passing branch as positional
      if [[ -n "$1" && "$1" != "" ]]; then
        BRANCH="$1"
        shift
      fi
      ;;
  esac
done

CURRENT=$(git rev-parse --abbrev-ref HEAD)
echo "Current branch: $CURRENT"
if [ "$CURRENT" != "$BRANCH" ]; then
  echo "Switching to branch $BRANCH"
  git checkout "$BRANCH"
fi

echo "Staging all changes (will exclude .env.local if present)..."
git add .

# Ensure we do not accidentally commit local env files
if [ -f .env.local ]; then
  git reset -- .env.local || true
fi

if [ "$DRY_RUN" -eq 1 ]; then
  echo "\n🔎 Dry run: showing git status and staged diff"
  git status --short
  echo "\n--- Staged diff ---"
  git --no-pager diff --cached || true
  echo "\nDry run complete. No changes were committed or pushed."
  exit 0
fi

STAGED_COUNT=$(git diff --cached --name-only | wc -l | tr -d ' ')
if [ "$STAGED_COUNT" -eq 0 ]; then
  echo "No staged changes to commit. Nothing to push."
  exit 0
fi

echo "Staged files:"
git --no-pager diff --cached --name-only

read -p "Commit and push all staged changes to $BRANCH? (y/N) " ans
case "$ans" in
  [yY]|[yY][eE][sS])
    echo "Committing..."
    git commit -m "chore: commit pending change control updates"
    echo "Pushing to origin/$BRANCH..."
    git push origin "$BRANCH"
    echo "✅ Changes pushed. The push will trigger GitHub Actions for this branch/PR."
    ;;
  *)
    echo "Aborted by user. No commit/push performed."
    exit 0
    ;;
esac

if command -v gh >/dev/null 2>&1; then
  echo "Listing recent workflow runs for branch $BRANCH (last 5):"
  gh run list --branch "$BRANCH" --limit 5 || true
  echo "Use: gh run view <id> --log to inspect logs for a run id." 
else
  echo "GitHub CLI (gh) not found. Open the GitHub Actions UI to inspect runs and logs." 
fi

echo "Done."
