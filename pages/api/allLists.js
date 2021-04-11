import { MongoClient } from 'mongodb';

export default async (req, res) => {
    if (req.method !== 'GET') {
        return;
    }

    const connectionString =
        'mongodb+srv://mattwendzina:bXKcltQ6Ovq1jl8g@cluster0.a1qam.mongodb.net/listsDatabase?retryWrites=true&w=majority';

    const client = await MongoClient.connect(connectionString);

    const db = client.db();

    try {
        const result = await db.collection('lists').find().toArray();
        res.status(201).json({ allLists: result });
        client.close();
    } catch (e) {
        console.log(e);
        client.close();
        return;
    }
};
