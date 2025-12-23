Title: chore(remediation): upgrade deps, pin TypeScript, add CI + Sanity secret integration

Scope
- What: Upgrade and align dependencies, pin TypeScript, fix lint script, and integrate secure Sanity API token usage in CI.
- Files changed: `security/remediation-plan.md`, `package.json`, `.github/workflows/ci.yml`, `lib/sanityClient.js`, `scripts/smoke-sanify.js`, `README.md`.
- Secrets required for CI: `SANITY_API_TOKEN`, `SANITY_PROJECT_ID`, `SANITY_DATASET`; optionally `NPM_TOKEN`, `NPM_REGISTRY_URL`.

Summary of changes
- Pin `typescript` to `5.4.5` to match `@typescript-eslint` support.
- Fix `lint` script to run ESLint on `app/**/*.{js,ts,jsx,tsx}`.
- Align `sanity` and `next-sanity` to a stable public 4.x set as a safe fallback (CI verifies for your registry).
- Add GitHub Actions workflow to run `npm ci`, `lint`, `build`, `test`, and `smoke` checks on PRs.
- Integrate secure CI usage of `SANITY_API_TOKEN` via GitHub Actions secrets and server-only `lib/sanityClient.js`.
- Add `scripts/smoke-sanify.js` for a read-only Sanity smoke check; workflow fails fast if required secrets are missing.

Canary risk
- This PR avoids canary/-next releases; it uses public stable releases where possible.
- If you prefer `sanity` 7.x, provide registry credentials (or confirm) and I will update the dependency alignment and re-verify in CI. 7.x may require private registry access or different peer resolutions.

CI verification checklist (these commands run in CI)
- Install dependencies:
  - `npm ci` — expected: exit 0, node_modules installed.
- Lint:
  - `npm run lint` — expected: exit 0 (no new ESLint errors).
- Build:
  - `npm run build` — expected: exit 0, produces `.next`.
- Tests:
  - `npm test` — expected: exit 0 (all unit tests pass).
- Smoke:
  - `npm run smoke` — expected: exit 0 (Sanity read-only smoke check passes).
- Notes: CI will fail fast if `SANITY_API_TOKEN` (and required SANITY variables) are missing.

Reviewer confirmation template
- I confirm I reviewed:
  - [ ] `package.json` diffs for `scripts` and `devDependencies`.
  - [ ] `security/remediation-plan.md` consolidated plan & Phase statuses.
  - [ ] `.github/workflows/ci.yml` injects `SANITY_API_TOKEN` and optionally `NPM_TOKEN`.
  - [ ] `lib/sanityClient.js` is server-only and uses `process.env.SANITY_API_TOKEN`.
  - [ ] Pinning TypeScript to `5.4.5` is acceptable for CI and consumers.

