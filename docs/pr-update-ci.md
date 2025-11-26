PR update: CI workflow, Node 20 pin, mock server, smoke test

Summary
- Branch: `cleanup/cloudflare-deploy`
- Goal: restore a validated CI workflow (job-level env mapping), make smoke tests deterministic using a lightweight mock server, ensure builds run on Node 20, and provide runbook + PR notes for maintainers.

Key commits (already pushed)
- `8d3f70e` — ci: restore smoke workflow with job-level env mapping for CI_RPC_URL
- `7378978` — chore: pin Node 20 via .nvmrc and package.json engines
- `f0a21da` — docs: add wrangler dev runbook for local Worker testing

YAML validation
- `.github/workflows/ci-smoke.yml`: YAML OK (validated locally with PyYAML safe_load)

Local verification (performed on developer machine)
- Node: v20.19.6 (confirmed)
- `npm ci`: completed (installed ~2832 packages). Notes: many peer/deprecation warnings; `npm audit` reports 14 high severity vulnerabilities (address separately).
- `npm run build`: Next.js build succeeded (pages prerendered)
- Mock server: started and served `/api/tier` and `/_health` (log: "CI mock server listening on 3000")
- Smoke test output (first lines):
  - `tier: 200 { tier: 'free' }` (fatal check passed)
  - `rpc status: 403 no-json` (RPC check non-fatal)
  - Smoke exit code: 0

Files added/modified
- `.github/workflows/ci-smoke.yml` — restored validated workflow (uses job-level env mapping: `NEXT_PUBLIC_RPC_URL: ${{ secrets.CI_RPC_URL }}`)
- `.github/workflows/ci-smoke.yml.bak` — backup of previous placeholder workflow (kept)
- `.nvmrc` — pins Node 20
- `ci/mock-server.js` — deterministic mock server (already present)
- `scripts/smoke-check.js` — tolerant RPC check (already present)
- `docs/wrangler-dev.md` — runbook for local Worker testing
- `docs/pr-update-ci.md` — this file

Suggested PR description text (copy into PR #2):

```
This PR prepares the repo for Cloudflare Pages and restores a CI smoke workflow that uses job-level env mapping for the RPC secret.

What I changed:
- Restored `.github/workflows/ci-smoke.yml` that runs build + a deterministic smoke test. The workflow sets `NEXT_PUBLIC_RPC_URL` from the repository secret `CI_RPC_URL` at job level to avoid editor diagnostics.
- Added `.nvmrc` to pin Node 20 (Cloudflare Pages and local builds).
- Verified `scripts/smoke-check.js` is tolerant of RPC outages (RPC check is non-fatal) and requires `/api/tier` success.
- Confirmed `ci/mock-server.js` exists and `package.json` includes `ci-mock`, `ci-mock-stop`, and `smoke` scripts for deterministic CI behavior.
- Added `docs/wrangler-dev.md` with instructions for running the Worker locally.

Validation & local run:
- Workflow YAML validated locally (PyYAML): YAML OK
- Local build: `npm ci` & `npm run build` succeeded on Node 20
- Smoke test (against local `ci/mock-server.js`): `/api/tier` returned 200 and `{ tier: 'free' }`; RPC endpoint returned 403/no-json but is non-fatal; smoke exit code 0

Notes & follow-ups:
- Do not add secrets to the repository. To enable full RPC checks in CI, the repo admin must add a secret named `CI_RPC_URL` (Settings → Secrets and variables → Actions).
- `npm ci` produced multiple peer warnings and `npm audit` shows 14 high severity vulnerabilities — these should be handled separately.

Rollback commands (if you want to revert quickly):

1) Revert a specific commit (recommended when you want to undo a single commit):
```
git revert <commit-hash>
git push origin cleanup/cloudflare-deploy
```

2) Restore the previous workflow placeholder backup (restore from the backup file):
```
cp .github/workflows/ci-smoke.yml.bak .github/workflows/ci-smoke.yml
git add .github/workflows/ci-smoke.yml
git commit -m "revert: restore previous ci-smoke.yml backup"
git push origin cleanup/cloudflare-deploy
```

3) Remove the workflow entirely (quick removal):
```
git rm .github/workflows/ci-smoke.yml
git commit -m "ci: remove smoke workflow"
git push origin cleanup/cloudflare-deploy
```

If you'd like, I can also append the above summary directly to PR #2 using the GitHub CLI — but I will not run any commands that use repository credentials without your explicit approval.

---
End of update.
