import { NextRequest, NextResponse } from "next/server";
require('dotenv').config();
import { MongoClient } from 'mongodb';

const connectionString: string | undefined = process.env.DATABASE_URL;

export async function GET(request: NextRequest) {
    if (!connectionString) {
        throw new Error('DATABASE_URL environment variable is not set.');
    }

    const client = new MongoClient(connectionString);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('test');
        const issuesCollection = db.collection('issues');

        const cursor = issuesCollection.find({
            title: { $exists: true, $ne: [] },
            description: { $exists: true, $ne: [] },
        });

        // Convert the cursor to an array
        const result = await cursor.toArray();

        return NextResponse.json(result, { status: 201 });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await client.close();
    }
}
