# Ping Pong Score Tracker for Interview

## To start development:
`cd backend && AWS_PROFILE={profile} npm start -- --stage {stage}`

`cd frontend && npm run dev`

## Deployment


## Limitations
- Only supports 250 players. Can easily add pagination on the backend and a "load more results" button on the front-end to fix this.
- Doesn't support single-source of truth / code-gen for the models. Have to update both GraphQL and Typescript types for models. Source of truth should be Typescript and `schema.graphql` could be auto-generated from that.