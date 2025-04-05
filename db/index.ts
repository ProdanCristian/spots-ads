import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/auth";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, {
  ssl: { rejectUnauthorized: false },
});

export const db = drizzle(client, { schema });
export { schema };
