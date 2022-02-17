# Codegraded Project DOM

## Setup

- `npm install`
- `npm start`
- `npm test`

## Features

- Base DOM project with tests
- Supports Axios and the browser's fetch API
- Includes an Express server learners can interact with from the app or via Postman (localhost:9000)
- Single `start` script to launch the Express server and the auto-reloading dev server for the frontend
- The `start` script takes care of freeing ports 3000 and 9000 for better learner experience
- The Express server is mocked in the tests with Mock Service Worker
- It does not depend on any external API to fetch JSON
- Includes staff-facing [Codegrade setup instructions](codegrade_setup.md) and rubric
