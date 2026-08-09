import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const rawUrl = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/ncomputing";

/**
 * Safely parse a database URL that may contain un-encoded special characters
 * in the password (e.g. ?, /, %, #). We manually extract components and
 * re-assemble with a properly encoded password so postgres-js never throws.
 */
function buildSafeConnection(url: string) {
  try {
    // First try to parse the URL directly
    const parsed = new URL(url);
    return postgres(url, { ssl: "allow", max: 10 });
  } catch {
    // URL parsing failed — password likely has un-encoded special chars.
    // Manually extract components using a regex approach.
    const match = url.match(
      /^(postgresql?):\/\/([^:@]+):([^@]+)@([^:/]+):?(\d+)?\/(.+)$/
    );
    if (!match) {
      console.error("❌ DATABASE_URL is not a valid PostgreSQL URL. Check your .env file.");
      // Return a dummy client that will fail gracefully on first query
      return postgres({
        host: "localhost",
        port: 5432,
        database: "ncomputing",
        max: 1,
      });
    }

    const [, , user, rawPassword, host, port, database] = match;
    // Decode any partial encoding then re-encode cleanly
    let password = rawPassword;
    try { password = decodeURIComponent(rawPassword); } catch {}

    console.warn(`⚠️  DATABASE_URL password had un-encoded characters — parsed manually. Host: ${host}`);

    return postgres({
      host,
      port: port ? parseInt(port) : 5432,
      database,
      username: user,
      password,
      ssl: "allow",
      max: 10,
    });
  }
}

const client = buildSafeConnection(rawUrl);
export const db = drizzle(client, { schema });
