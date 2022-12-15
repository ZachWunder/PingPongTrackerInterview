# Ping Pong Score Tracker for Interview

## To start development:
`cd backend && AWS_PROFILE={profile} npm start -- --stage {stage}`

After backend has finished: Update `src/aws-exports.js`. This can be found in the AWS console -> Appsync.

`cd frontend && npm run dev`

## Deployment
`AWS_PROFILE={profile} npm run deploy --  --stage {stage}`

Once finished deploying, set aws-exports like in development and re-deploy.

## Testing Strategy
I didn't have time to implement testing. On the backend, I would create unit tests around `services/api.ts`. I would also setup an integration test suite to run the GraphQL queries on a live deployment. On the frontend, I like to use synthetic monitoring on a dev deployment. In production, I would use something like Datadog for monitoring (Error Tracking and Real User Monitoring).

## Limitations
- Only supports 250 players. Can easily add pagination on the backend and a "load more results" button on the front-end to fix this.
- Doesn't support single-source of truth / code-gen for the models. Have to update both GraphQL and Typescript types for models. Source of truth should be Typescript and `schema.graphql` could be auto-generated from that.
- No back-end validation beyond GraphQL schema validation and enforcing unique player names.

## Design Choices
- Used official USATT elo scoring system for calculating leaderboard.
- Would setup a better monolith structure to share types, queries/mutations and schema across front-end and back-end. Currently uses amplify codegen.