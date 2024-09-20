# Transactions Monorepo

This is a monorepo built with Turborepo. It contains the following apps:

```plaintext
apps
├── frontend
├── backend
```

## Development

To begin working on the apps, setup the PostgreSQL database:

```bash
docker-compose up -d
```

Then, install the dependencies:

```bash
pnpm install
```

Check for any environment variables that need to be set in the `.env` files in the apps.

Finally, start the development servers:

```bash
pnpm dev

# Or

turbo dev
```

## Next Steps

All done! Now check for the README.md files in the apps for more information on how to work on them.
