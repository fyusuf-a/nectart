# Prerequisites

- Install [node: .js](https://nodejs.org/en/download/).
- Install [pnpm](https://pnpm.io/installation).
- Set up a private key for Github
- Install [git lfs](https://git-lfs.com/)
- Install [solana-cli](https://docs.solanalabs.com/cli/install)

# Getting started

```bash
If you have not setup `solana-cli` yet
```
solana-keygen new
```

```bash
git clone git@github.com:fyusuf-a/nectart
cd nectart
```

```bash
pnpm install
```

```bash
pnpm run compress
```

```bash
pnpx prisma generate
```

Set up a Vercel project and get environment variables for Vercel Postgres and Vercel Blob
```bash
cp .env.example .env
pnpm run setup:blockchain
```
Complete the environment variables in the `.env` file

```bash
pnpm run dev
```

Reset and seed the database
```bash
pnpx prisma migrate reset
```

