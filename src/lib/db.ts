import { Pool, QueryResult } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Define the type for your query result rows
export type Todo = {
  id: number;
  title: string;
  description: string | null;
  status: string;
  priority: number;
  due_date: string | null;
  created_at: string;
  updated_at: string;
};

// Create a connection pool
const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBNAME,
  password: process.env.DBPASS,
  port: 5435, // Default PostgreSQL port
});

// Define the query function that is fully type-safe
export const query = async <T, Params extends unknown[]>(
  text: string,
  params?: Params
): Promise<QueryResult<T>> => {
  return pool.query<T>(text, params);
};

export default pool;
