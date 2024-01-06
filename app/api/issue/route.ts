import { NextRequest, NextResponse } from "next/server";
require('dotenv').config();
import { MongoClient } from 'mongodb';
import { createIssueSchema } from "../../createIssueSchema";

const connectionString: string | undefined = process.env.DATABASE_URL;

export async function POST(request: NextRequest) {
    if (!connectionString) {
        throw new Error('DATABASE_URL environment variable is not set.');
    }

    const client = new MongoClient(connectionString);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('test');
        const issuesCollection = db.collection('issues');

        const body = await request.json();
        const validation = createIssueSchema.safeParse(body);
        console.log(validation);

        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 });
        }

        const newIssue = {
            title: body.title,
            description: body.description
        };

        const result = await issuesCollection.insertOne(newIssue);

        return NextResponse.json(result, { status: 201 });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await client.close();
    }
}
