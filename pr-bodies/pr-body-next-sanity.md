**Summary**
- Upgrades `next-sanity` to `^9.12.0` to address high-severity advisories and improve compatibility with the upgraded `sanity` package.

**Verification**
- Run:
```bash
npm install next-sanity@^9.12.0
npm ci && npm audit --production
npm run build
```
- Confirm Next.js build completes successfully and server-side rendering/integration paths that use `next-sanity` are working.
- Run any integration or smoke tests that fetch content from Sanity.

**Impact**
- Integration points between Next.js and Sanity may require small adaptations; check data fetching, image helpers, and client initialization code.
- If `sanity` was upgraded in a separate PR, test both together in a branch that contains both changes before merging to main if necessary.

**Reviewers**
- @tech-lead @security-lead @product-owner

**Notes**
- Keep the PR scoped to `next-sanity` only. If downstream breakage occurs, create quick follow-ups to adjust adapters/helpers.
