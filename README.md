# Nectart

https://nect.art (deployed on the devnet)

This project presented for the Solana Radar Hackathon uses a project that was coded before. We have been authorized to do so by an email from nate@colosseum.org sent on September 10, 2024, as long as the project has "some sort of Solana integration", which we implemented.

## Prerequisites

- Install [node.js](https://nodejs.org/en/download/).
- Install [pnpm](https://pnpm.io/installation).
- Set up a private key for Github
- Install [git lfs](https://git-lfs.com/)
- Install [solana-cli](https://docs.solanalabs.com/cli/install)

## Getting started

If you have not setup `solana-cli` yet
```bash
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

