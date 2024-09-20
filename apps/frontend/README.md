# Transactions frontend

This is the frontend for the transactions app. It's built with Vite and uses React with TypeScript and SWC.

## Development

To begin working on the backend, first install the dependencies:

```bash
pnpm install
```

Finally, start the development server:

```bash
pnpm dev
```

The server will be running at [http://localhost:3000/api](http://localhost:3000/api).

## Testing

Tests were meant to be written with Jest and React Testing Library, but because of the newer versions of Vite, regular setup doesn't seem to work. So, tests are written with Vitest.

To run the tests, use the following command:

```bash
pnpm test

# Or

pnpm test:watch

# Or

pnpm test:cov
```

Production URL [here](https://main.dwybj1z9s4trq.amplifyapp.com/)

Yes, the frontend can be accessed by serving the static dist folder with the necessary Nest.js packages, but just for the seek of knowledge, AWS Amplify was used to deploy this part of the monorepo.
