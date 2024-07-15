import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { getClient } from "@/app/lib/server/db";

console.log('Running seed script');

async function seed() {
    const client = getClient();
    await client.connect();

    // Create the users table if it doesn't exist
    await client.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            password VARCHAR(100) NOT NULL
        )
    `);

    // Generate fake data
    const users = [];
    const defaultPassword = 'password123';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    for (let i = 0; i < 10; i++) {
        users.push({
            username: faker.internet.userName(),
            password: hashedPassword,
        });
    }

    // Insert fake data into the users table
    for (const user of users) {
        await client.query(`
            INSERT INTO users (username, password)
            VALUES ($1, $2)
        `, [user.username, user.password]);
    }

    console.log('Inserted fake data into users table');
    await client.end();
}

seed().catch(console.error);
