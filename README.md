# Ping Pong Score Tracker for Interview

## To start development:
`cd backend && AWS_PROFILE={profile} npm start -- --stage {stage}`

`cd frontend && npm run dev`

## Deployment


## Limitations
- Only supports 250 players. Can easily add pagination on the backend and a "load more results" button on the front-end to fix this.
- Doesn't support single-source of truth / code-gen for the models. Have to update both GraphQL and Typescript types for models. Source of truth should be Typescript and `schema.graphql` could be auto-generated from that.
- No back-end validation beyond GraphQL schema validation and enforcing unique player names.

## Design Choices
- Used official USATT elo scoring system for calculating leaderboard.
- Would normally go for Next.js and use server-side data fetching and rendering with optimistic updates. I would also consider Remix + Cloudflare Workers / Fly.io for small and global applications.
- Would use Postgres over Dynamo for production applications.
- Would use Prisma or other ORM and a better monolith structure to share types, queries/mutations and schema across front-end and back-end. Currently uses amplify codegen.