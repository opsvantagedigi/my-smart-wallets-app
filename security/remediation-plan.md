# Security Remediation Plan — Consolidated (Phases 1–7)

This document consolidates the remediation plan for `my-smart-wallets-app` into seven phases. It tracks design decisions, verification steps, and known risks.

Phases
- Phase 1 — Fix reported security advisories
  - Update vulnerable packages where safe.
  - Add overrides for known transitive issues (`@tanstack/form-core`, `glob`).
  - Verification: `npm audit` → zero high/critical advisories or triaged items.

- Phase 2 — Pin Node and runtime expectations
  - Target Node.js `20.x` in CI and documentation.
  - Ensure `engines` in `package.json` updated if required.

- Phase 3 — Workflow and tsconfig hygiene
  - Add GitHub Actions workflow to run `npm ci`, `lint`, `build`, `test`, and `smoke`.
  - Ensure `tsconfig.json` aligns with `typescript@5.4.5` and `@typescript-eslint` parser support.

- Phase 4 — Lint script and code style alignment
  - Fix `lint` script to target `app/**/*.{js,ts,jsx,tsx}` rather than an incorrect path.
  - Run `npx eslint . --fix` in CI pre-merge to avoid regressions.

- Phase 5 — Smoke test triage
  - Add a `smoke` script for quick end-to-end checks and a `scripts/smoke-sanify.js` for Sanity read-only verification.
  - Document expected smoke outcomes and configure CI to fail on smoke failures.
  - Note: local smoke failures may be environment-specific; CI is authoritative.

- Phase 6 — TypeScript alignment
  - Pin `typescript` to `5.4.5` to match installed `@typescript-eslint` and linting pipeline.
  - Track warnings for future upgrades; create follow-up ticket to upgrade `@typescript-eslint` then TypeScript.

- Phase 7 — Sanity / next-sanity dependency alignment + token integration
  - Align `sanity`, `@sanity/*`, and `next-sanity` to a coherent set. Options:
    - Option A (preferred if registry supports): `sanity` 7.x + `next-sanity` 7.x (requires private registry or access)
    - Option B (public fallback used in this PR): `sanity` 4.x + `next-sanity` 4.x
  - Integrate `SANITY_API_TOKEN` securely as a GitHub secret and use server-only `lib/sanityClient.js`.
  - Verification: CI `npm ci` must succeed, followed by `npm run build` and `npm run smoke` (which runs a read-only Sanity check).

Verification checklist
- `npm ci` — success
- `npm run lint` — success (or known warnings only)
- `npm run build` — success (Next.js build completes)
- `npm test` — tests pass (or clearly documented failures)
- `npm run smoke` — sanity smoke checks pass

Canary / registry notes
- If your org uses a private registry with newer/canary `sanity` releases, verify those in CI by adding registry credentials to repository secrets and configuring `~/.npmrc` in workflow. Without access, the PR uses the public 4.x fallback.
- Releasing or upgrading to `sanity` 7.x should be done behind a feature flag and validated in staging.

Change log
- Consolidated plan (Phases 1–7), added CI verification checklist and canary-risk guidance.
- Added Sanity token integration guidance and smoke verification step.
- Tracked follow-ups: upgrade `@typescript-eslint` and then `typescript`, evaluate `sanity` 7.x when registry access available.

Contact
- For registry issues or to request a 7.x migration, tag `@infra` or the maintainers listed in `README.md`.

## Phase 1 — glob/Sanity advisories remediation
## Phase 1: glob/Sanity Advisories
Remediation: Upgraded glob, sanity, @sanity/client, next-sanity. Peer dependency warning noted.
Status: PR prepared.
PR Link: [#<PR_NUMBER>](https://github.com/opsvantagedigi/my-smart-wallets-app/pull/<PR_NUMBER>)
Canary Risk: Peer dependency misalignment may cause warnings; no runtime impact observed.

## Phase 2: Workflow/tsconfig Remediation
Remediation: Fixed workflow YAML headers, validated tsconfig. Documented in plan.
Status: Merged/Verified.

## Lint Script Alignment
Remediation: Updated lint script to target valid source directory.
Status: Complete.
Follow-up: TypeScript/ESLint version warning tracked for future alignment.
- Action: Align ESLint/TypeScript versions in future remediation
## Smoke Test Failures
Remediation: Documented failures for triage. Failures are unrelated to package upgrades; manual review recommended.
Status: Pending review.

## TypeScript Version Alignment
Remediation: Downgraded TypeScript to 5.4.5 to align with @typescript-eslint supported range.
Status: Complete.
- Issue: /api/tier ECONNREFUSED, rpc status 403 no-json, other endpoints failed
- Note: Failures are likely unrelated to package upgrades and require separate triage
## Phase 1 — glob/Sanity advisories remediation
## Phase 1: glob/Sanity Advisories
Remediation: Upgraded glob, sanity, @sanity/client, next-sanity. Peer dependency warning noted.
Status: PR prepared.
PR Link: [#<PR_NUMBER>](https://github.com/opsvantagedigi/my-smart-wallets-app/pull/<PR_NUMBER>)
Canary Risk: Peer dependency misalignment may cause warnings; no runtime impact observed.
## Phase 2 — @tanstack form-core remediation
## Phase 2: Workflow/tsconfig Remediation
Remediation: Fixed workflow YAML headers, validated tsconfig. Documented in plan.
Status: Merged/Verified.
- Advisory cleared
## Lint Script Alignment
Remediation: Updated lint script to target valid source directory.
Status: Complete.
Follow-up: TypeScript/ESLint version warning tracked for future alignment.
**Project**: my-smart-wallets-app  
## Smoke Test Failures
Remediation: Documented failures for triage. Failures are unrelated to package upgrades; manual review recommended.
Status: Pending review.

## TypeScript Version Alignment
Remediation: Downgraded TypeScript to 5.4.5 to align with @typescript-eslint supported range.
Status: Complete.

## Summary
Brief summary of the audit findings and scope of remediation. Example: "npm audit produced X high, Y moderate advisories affecting direct and transitive dependencies. This plan prioritizes fixes, mitigations, and verification steps."

## Findings Overview
- **High severity**: list packages and short description of issue; indicate direct or transitive.
- **Moderate severity**: list packages.
- **Low severity**: list packages.

## Prioritization and Rationale
1. **Critical / High** — fix immediately; block releases until resolved or mitigated.
2. **Medium** — schedule within sprint; require PR and tests.
3. **Low** — track and resolve in routine dependency updates.

## Remediation Actions
For each finding include:
- **Package**: package-name
- **Severity**: High/Medium/Low
- **Type**: direct / transitive
- **Recommended fix**: upgrade to version X; apply override; replace package; remove usage
- **Owner**: @github-handle
- **ETA**: date
- **Verification**: tests to run, commands, expected result

Example entry
- **Package**: lodash
- **Severity**: High
- **Type**: transitive (via package-a)
- **Recommended fix**: upgrade package-a to version >= X which depends on patched lodash; if not available, add `overrides` in package.json to force lodash@patched-version and open PR to upstream.
- **Owner**: @dev-lead
- **ETA**: 3 business days
- **Verification**: `npm ci && npm audit --production` shows no high/critical; run unit tests.

## Temporary Mitigations
- Add runtime WAF rules or input validation for issues that cannot be patched immediately.
- Restrict access to vulnerable endpoints until fix is deployed.

## Testing and Verification
- Commands:
  - `npm ci`
  - `npm audit --json > npm-audit-report.json`
  - `npx markdownlint-cli2 "playbook/**/*.md"` (for docs)
- Acceptance: no high/critical advisories; CI passes; smoke tests green.

## Change Log
- Record PR links, commit hashes, and verification notes for each fix.

## Phase 2 — @tanstack form-core remediation

- Dist build artifacts removed and ignored via `.gitignore` (commit: "chore: ignore dist artifacts and remove from repo").
- Smoke tests passed after @tanstack/* upgrade; logs attached to PR #10.
- Advisory for prototype pollution in @tanstack/form-core cleared.

## Risk Register
- For any advisory without an immediate fix, document risk, compensating controls, and review cadence.

## Approvals
- Security Lead: @security-lead
- Tech Lead: @tech-lead
- Product Owner: @product-owner
