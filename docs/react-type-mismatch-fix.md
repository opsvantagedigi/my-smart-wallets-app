# React + TypeScript Type Mismatch Fix

This document records the ritual to permanently resolve React type mismatches across the monorepo/workspace.

Steps performed:

1. Added `resolutions` and `overrides` to the root `package.json` to lock versions:

```json
"resolutions": {
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "@types/react": "^18.2.41",
  "@types/react-dom": "^18.2.17"
},
"overrides": {
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "@types/react": "^18.2.41",
  "@types/react-dom": "^18.2.17"
}
```

2. Remove `node_modules` and lock files, then reinstall to get a single consistent set of React packages.

3. If any packages still bring incompatible React versions, use `npm ls react` and `npm ls @types/react` to find the culprits and add package-specific overrides.

4. Commit the changes and push. Netlify will auto-deploy the fixed build.

Notes:
- If you use Yarn workspaces, prefer Yarn's `resolutions`; for NPM we added `overrides` and you can use `npm-force-resolutions` when necessary.
- Keep the versions in `resolutions`/`overrides` in sync with the root `dependencies`.
