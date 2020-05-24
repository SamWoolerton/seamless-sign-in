# Usage notes

## Local dev

`netlify dev` starts up both the frontend and runs the serverless functions locally.

## Dev mode environment variables

Need a `.env` with `NODE_ENV="development"`, otherwise Netlify will pull in the environment variables from the UI, which is set to `production`.
