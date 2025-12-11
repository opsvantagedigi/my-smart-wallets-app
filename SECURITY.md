# Security Posture and Vulnerability Audit

Date: 2025-12-11

Summary:
- Ran `npm audit` after dependency upgrades and overrides.
- Upgraded `@account-kit/core`, `@account-kit/infra`, `@account-kit/react` to `^4.81.3`.
- Remaining advisories: 4 high-severity findings originating from `@tanstack/form-core` via `@tanstack/react-form` / `@tanstack/zod-form-adapter`, used transitively by `@account-kit/react`.
- npm audit notes: "No fix available" for the upstream chain at this time.
 - Latest npm registry metadata confirms `@account-kit/react@4.81.3` still depends on `@tanstack/react-form@^0.33.0` and `@tanstack/zod-form-adapter@^0.33.0`, so no upgrade path resolves these advisories presently.

Actions Taken:
- Applied `package.json` overrides to mitigate other transitive issues: `undici >=5.28.6`, `path-to-regexp >=6.2.3`, `esbuild >=0.24.4`.
- Pin `jsdom` to `27.3.0` (consistent with Node 20) to suppress engine warnings.
- Build system configured to avoid bundling node-only test files (Webpack externals and disabling Turbopack in `next.config.mjs`).

Risk Acceptance:
- The residual advisories are upstream in `@tanstack/*` packages brought by `@account-kit/react`.
- No patch versions are available as of this audit. We will monitor releases from Alchemy Account Kit and TanStack.
- App does not explicitly use TanStack Form APIs; exposure surface is limited to transitive inclusion by Account Kit UI. Runtime attack surface appears low within our usage (no untrusted inputs flow through those modules in our app logic).

Planned Follow-ups:
- Track `@account-kit/react` releases and changelog for removal/upgrade away from vulnerable TanStack Form versions.
- Re-run `npm audit` weekly and before each release.
- If advisories become exploitable in our threat model, consider swapping UI kit or isolating usage behind SSR-only boundaries.
# Security Status and Vulnerability Notes

Last reviewed: 2025-12-11

This document tracks known advisories affecting transitive dependencies used by this project, the current mitigation strategy, and acceptance until upstream fixes are available.

## Known Advisories

- Package: `@tanstack/form-core` (< 0.42.1)
  - Severity: High — Prototype pollution
  - Advisory: https://github.com/advisories/GHSA-ggv3-vmgw-xv2q
  - Transitive via: `@account-kit/react` → `@tanstack/react-form` and `@tanstack/zod-form-adapter`
  - Current status: `@account-kit/react@latest` depends on `@tanstack/react-form@^0.33.0`, which in turn depends on vulnerable `@tanstack/form-core` versions. No safe upgrade path available without breaking `@account-kit/react`.

## Risk Assessment

- Scope of use: The affected packages are used only within client-side Account Kit form components. They do not process untrusted server-side input, nor are they used in authentication token handling or API request validation.
- Attack surface: Limited. Inputs handled are typical user fields (e.g., email/name). No object prototype manipulation is performed by our code. Cookies are `HttpOnly`, `Secure`, `SameSite=Strict` and JWT verification is independent of TanStack Form.

## Mitigation Strategy

- Do not attempt overrides to force `@tanstack/form-core >= 0.42.1` at this time, to avoid breaking `@account-kit/react` runtime behavior.
- Monitor `@account-kit/react` release notes for dependency bumps away from vulnerable TanStack Form versions.
- Re-run `npm audit` as part of release validation; upgrade promptly once a compatible fix is available.
- Keep form inputs minimal and validated via `zod` on the client; never trust client data on the server.

## Acceptance

- Temporarily accepted until `@account-kit/react` publishes versions depending on `@tanstack/form-core >= 0.42.1`.
- We will re-audit regularly and update dependencies when a safe path exists.

---

If you discover additional vulnerabilities or have concerns, please open an issue and include `npm audit` output and steps to reproduce.