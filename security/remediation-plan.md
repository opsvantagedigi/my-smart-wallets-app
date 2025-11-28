# Security Remediation Plan

**Project**: my-smart-wallets-app  
**Branch**: cleanup/cloudflare-deploy  
**Author**: Ajay  
**Date**: 2025-11-28

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

## Risk Register
- For any advisory without an immediate fix, document risk, compensating controls, and review cadence.

## Approvals
- Security Lead: @security-lead
- Tech Lead: @tech-lead
- Product Owner: @product-owner

## Remediation Entries (High Severity)

Below are concrete remediation entries derived from `npm-audit-report.json` (high severity advisories). Each entry lists the package, impact, recommended fixes, and suggested `package.json` changes where applicable.

1) Package: `@account-kit/react`
- Severity: High
- Type: direct
- Summary / Risk: Uses `@tanstack/react-form` and `@tanstack/zod-form-adapter`, which depend on `@tanstack/form-core` versions vulnerable to prototype-pollution (high). This affects form handling and may allow denial-of-service or unexpected behavior in runtime.
- Recommended fix: Contact `@account-kit` upstream for a patched release that upgrades `@tanstack/*` to secure versions. If an updated release is available, upgrade `@account-kit/react` to the patched version.
- Temporary mitigation: Add an `overrides` entry for `@tanstack/react-form` to `0.42.1` if available and test thoroughly; otherwise, isolate or remove usage of affected form functionality until patched.
- Owner: @Ajay
- ETA: 2025-12-01 (investigate) / 2025-12-04 (apply fix)
- Verification: `npm ci && npm audit --production` shows advisory resolved; run smoke tests.

Suggested `package.json` (example overrides block - apply only after confirming compatibility):

```json
"overrides": {
  "@tanstack/react-form": "0.42.1",
  "@tanstack/form-core": "0.42.1"
}
```

Notes: overriding transitive dependencies can mask upstream issues — prefer upstream patch.

2) Package: `@tanstack/form-core` (prototype pollution advisory)
- Severity: High
- Type: transitive (via `@tanstack/react-form`, `@tanstack/zod-form-adapter`)
- Summary / Risk: Prototype pollution in versions <0.42.1; high severity. No direct fix available in the report for this package in current tree.
- Recommended fix: Upgrade `@tanstack/*` packages to versions that depend on `form-core >= 0.42.1`. If upstream does not yet ship a fix, open an issue and consider temporary `overrides` as above.
- Owner: @Ajay
- ETA: 2025-12-04
- Verification: `npm audit` shows advisory removed; run integration tests.

3) Package: `@tanstack/react-form`
- Severity: High
- Type: transitive
- Summary / Risk: Dependent on vulnerable `form-core`. Fix available per audit.
- Recommended fix: Upgrade `@tanstack/react-form` to the patched release (>=0.42.1). If the package is a transitive dependency via `@account-kit/react`, prefer updating `@account-kit/react` or use `overrides` to force `@tanstack/react-form@0.42.1`.
- Owner: @Ajay
- ETA: 2025-12-03
- Verification: `npm audit` clean; test form flows.

4) Package: `@tanstack/zod-form-adapter`
- Severity: High
- Type: transitive (affects `@account-kit/react`)
- Summary / Risk: Uses `@tanstack/form-core` (vulnerable). Audit shows no immediate fix available.
- Recommended fix: Upgrade upstream packages that consume this adapter or replace with an alternative adapter; contact maintainers for a patch. Consider code-level input validation to minimize exposure.
- Owner: @Ajay
- ETA: 2025-12-07
- Verification: Audit and tests.

5) Package: `glob`
- Severity: High
- Type: transitive (used by multiple packages: `@architect/*`, `@next/eslint-plugin-next`, etc.)
- Summary / Risk: CLI command injection via `-c/--cmd` in vulnerable `glob` versions (>=10.2.0 <10.5.0). Affects build tooling and CLIs that call `glob` with risky options.
- Recommended fix: Upgrade packages that depend on `glob` to versions that include `glob@>=10.5.0`. Prioritized upgrades: `eslint-config-next` -> 16.0.5, `sanity` -> 3.95.0, `@architect/*` updates.
- Temporary mitigation: Use `overrides` to force `glob@10.5.0` in `package.json` if immediate upstream upgrades are not possible. Then run full CI to detect breakages.
- Owner: @Ajay
- ETA: 2025-12-03
- Verification: `npm audit` shows no `glob` advisory; run build and lint.

Suggested override snippet (if needed):

```json
"overrides": {
  "glob": "10.5.0"
}
```

6) Package: `eslint-config-next` / `@next/eslint-plugin-next`
- Severity: High
- Type: direct (eslint-config-next is direct devDependency)
- Summary / Risk: Transitive `glob` usage via older `eslint-plugin-next` releases; advisory resolved in `eslint-config-next@16.0.5`.
- Recommended fix: Upgrade `eslint-config-next` (devDependency) to `^16.0.5`. This is a semver-major upgrade — expect rule changes and require ESLint config adjustments.
- Impact: Lint rule behavior and Next.js ESLint plugin API may change; update ESLint config, fix rule violations, and run the lint CI.
- Owner: @Ajay / @frontend-team
- ETA: 2025-12-04
- Verification: `npx eslint .` passes in CI; `npm audit` no longer reports the transitive advisory.

Suggested `package.json` change:

```json
"devDependencies": {
  "eslint-config-next": "16.0.5"
}
```

7) Package: `sanity` / `next-sanity` / `@sanity/*`
- Severity: High
- Type: direct (both `sanity` and `next-sanity` are direct)
- Summary / Risk: Several `@sanity/*` and `next-sanity` entries depend on vulnerable transitive packages (`@architect/*`, `glob`). Audit shows `sanity@3.95.0` addresses several transitive issues.
- Recommended fix: Upgrade `sanity` to `^3.95.0` and `next-sanity` to `^9.12.0`. This is a semver-major bump; review release notes for breaking changes and run integration tests.
- Impact: Sanity APIs or runtimes may change; run local sanity builds and any runtime tasks used in production (e.g., studio builds). Coordinate with product team.
- Owner: @Ajay / @content-team
- ETA: 2025-12-07
- Verification: `npm audit` shows advisories removed; sanity studio builds and Netlify/Pages builds pass.

8) Packages: `@architect/hydrate`, `@architect/inventory`, `@architect/utils`
- Severity: High
- Type: transitive (affect `@sanity/runtime-cli`, `@sanity/cli`)
- Summary / Risk: These packages pull a vulnerable `glob`/other transitive packages. Audit suggests fix available via upgrading `sanity` to 3.95.0.
- Recommended fix: Upgrade `sanity` and related `@sanity/*` packages to versions that remove vulnerable transitive dependencies.
- Owner: @Ajay
- ETA: 2025-12-07
- Verification: audit cleared, sanity runtime tasks succeed.

9) Package: `@sanity/cli` and `@sanity/runtime-cli`
- Severity: High
- Type: transitive
- Summary / Risk: CLI tooling affected by transitive vulnerabilities; fix available via `sanity@3.95.0`.
- Recommended fix: Upgrade `sanity` and any `@sanity/cli` packages to releases that include the patched transitive dependencies.
- Owner: @Ajay
- ETA: 2025-12-07
- Verification: Local CLI tasks run; `npm audit` clean for these advisories.

10) Package: `@tanstack/*` summary (grouped)
- Severity: High
- Type: mixed (transitive via account-kit)
- Summary / Risk: Prototype-pollution advisory in `form-core` (core lib) propagates through multiple adapters and form packages. This is high risk for any runtime that processes untrusted input through these forms.
- Recommended fix: Coordinate with library maintainers to obtain patched releases; prefer upgrading all `@tanstack/*` packages to versions that reference `form-core >=0.42.1`.
- Owner: @Ajay
- ETA: 2025-12-04
- Verification: audit clean, integration tests.

Notes on approach and sequencing
- Start with upgrades that have an available fix (`sanity`, `next-sanity`, `eslint-config-next`, `@tanstack/react-form`). These are highest ROI because the audit marks fixes available.
- Use `overrides` only as a temporary measure for transitive packages that have a known patched version (for example `glob@10.5.0`) and after running full CI to detect breakage.
- For packages with no immediate fix (e.g., `@tanstack/form-core` per report), contact maintainers and consider temporary mitigations (runtime validation, reducing attack surface, or replacing the library).

Suggested immediate `package.json` edits (example - do not apply without testing):

```json
{
  "overrides": {
    "glob": "10.5.0",
    "@tanstack/react-form": "0.42.1"
  },
  "dependencies": {
    "sanity": "^3.95.0",
    "next-sanity": "^9.12.0"
  },
  "devDependencies": {
    "eslint-config-next": "16.0.5"
  }
}
```

Follow-up actions
- Create one PR per major upgrade to keep changes reviewable (e.g., `upgrade/sanity-3.95`, `upgrade/eslint-config-next-16`, `override/glob-10.5`).
- Run CI on each PR, resolve lint/build/test breakages, and merge after approvals.
- After merging, re-run `npm audit` and update `security/remediation-plan.md` with verification notes and PR links.

## Phase 1 — High-severity upgrades (PR placeholders)

-- **chore/upgrade-sanity-3.95**
  - PR: https://github.com/opsvantagedigi/my-smart-wallets-app/pull/6
  - Purpose: Upgrade `sanity` to `^3.95.0` to remediate multiple high-severity advisories.
  - Verification: `npm ci && npm audit --production`, `npx sanity build`

- **chore/upgrade-next-sanity-9.12**
  - PR: https://github.com/opsvantagedigi/my-smart-wallets-app/pull/7
  - Purpose: Upgrade `next-sanity` to `^9.12.0` to remediate transitive high advisories and align with `sanity`.
  - Verification: `npm ci && npm audit --production`, `npm run build`

- **chore/upgrade-eslint-config-next-16.0.5**
  - PR: https://github.com/opsvantagedigi/my-smart-wallets-app/pull/8
  - Purpose: Upgrade `eslint-config-next` to `16.0.5` to remediate transitive vulnerabilities and update lint baseline.
  - Verification: `npm ci && npm audit --production`, `npm run lint`

- **Fallback (if `glob` advisory persists)**
  - PR branch: `chore/fix-glob-override`
  - Proposed change:
  ```json
  "overrides": {
    "glob": "10.5.0"
  }
  ```
  - PR: (placeholder) - open PR link here after creation
  - Verification: `npm ci && npm audit --production`

- **Post-merge step**:
  - Re-run `npm audit --production` and update counts and remaining advisories in this plan. Add links to merged PRs and note any follow-up upgrades required.

  ## Notes
  - `dist/` build artifacts were accidentally committed during local testing. These have been removed from the `chore/upgrade-sanity-3.95` branch and `dist/` is now ignored via `.gitignore`.
  - CI will produce fresh `dist/` artifacts during builds; the repo no longer tracks them to keep the history clean.

