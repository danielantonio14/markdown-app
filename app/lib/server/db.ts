// app/lib/server/db.ts
import { Client } from "pg";
import config from "./config";

console.log("Postgres URL:", config.POSTGRES_URL); // Adicione este console.log

export function getClient(): Client { 
    const client = new Client({
        connectionString: config.POSTGRES_URL,
    });
    return client;
}
