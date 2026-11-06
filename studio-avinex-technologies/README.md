# AVINEX Technologies - Sanity Studio

Standalone Sanity Studio for managing AVINEX Technologies products and categories.

- **Project ID**: `ofu7di82`
- **Dataset**: `production`

## Getting Started

From this directory:

```bash
# 1. Install dependencies
npm install

# 2. Start local Studio development server
npm run dev
```

The Studio will launch at `http://localhost:3333`.

## Authentication

When opening `http://localhost:3333` in your browser for the first time, log in with the Sanity account associated with project `ofu7di82`.

## Schema Deployment & TypeGen

```bash
# Deploy schema to Sanity Content Lake
npx sanity schemas deploy

# Generate TypeScript types for the frontend app
npm run typegen
```
