import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "./schema";

// Use this object to send drizzle requests to the database
export const db = drizzle(sql, { schema });