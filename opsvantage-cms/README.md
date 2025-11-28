# OpsVantage CMS (Strapi)

This folder contains a minimal Strapi project scaffold for local development using SQLite.

Quick start:

```bash
cd opsvantage-cms
cp .env.example .env
npm install
npx strapi develop
```

APIs:
- REST: available at `/api/*`
- GraphQL: enable the `@strapi/plugin-graphql` plugin (included in package.json)

Content types:
- Post (title, slug, body, publishedAt)
- Announcement (title, message, priority, expiresAt)
- TeamMember (name, role, bio, avatar)

Integration env:
- `SANITY_API_TOKEN` and `MARZ_API_KEY` placeholders included in `.env.example` for downstream integration.
