This is a [Next.js](https://nextjs.org) project to test the [SidePro](https://sidepro.cloud/) application.

## Create a local database

`docker run --name sidepro-nextjs-example -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=sidepro-nextjs-example -p 5435:5432 -d postgres`

```bash
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
);

INSERT INTO todos (title, status)
VALUES
    ('Buy groceries', 'pending',),
    ('Workout', 'pending'),
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
