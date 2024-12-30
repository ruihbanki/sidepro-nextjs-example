import { Pool, QueryResult, QueryResultRow } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Create a connection pool
const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBNAME,
  password: process.env.DBPASS,
  port: 5435, // Default PostgreSQL port
});

// Define the query function that is fully type-safe
export const query = async <
  T extends QueryResultRow,
  Params extends unknown[] = unknown[]
>(
  text: string,
  params?: Params
): Promise<QueryResult<T>> => {
  return pool.query<T>(text, params);
};

export default pool;
