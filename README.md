This is a [Next.js](https://nextjs.org) project to test the [SidePro](https://sidepro.cloud/) application.

## Create a local database

`docker run --name sidepro-nextjs-example -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=sidepro-nextjs-example -p 5435:5432 -d postgres`

## Add a table

```bash
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    priority INTEGER DEFAULT 1,
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO todos (title, description, status, priority, due_date)
VALUES
    ('Buy groceries', 'Milk, eggs, bread', 'pending', 2, '2024-01-01'),
    ('Workout', 'Go for a run in the park', 'pending', 1, '2024-01-02'),
    ('Finish project', 'Complete the PostgreSQL project', 'in-progress', 3, '2024-01-05');
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
