import { MongoClient } from 'mongodb';

export default async (req, res) => {
    if (req.method !== 'GET') {
        return;
    }

    const connectionString =
        'mongodb+srv://mattwendzina:bXKcltQ6Ovq1jl8g@cluster0.a1qam.mongodb.net/listsDatabase?retryWrites=true&w=majority';

    let client;
    try {
        client = await MongoClient.connect(connectionString);
    } catch (e) {
        res.status(500).json({
            message: `Failed to connect to server! - ${e.message}`,
        });
        return;
    }

    const db = client.db();

    let result;
    try {
        result = await db.collection('lists').find().toArray();
    } catch (e) {
        client.close();
        res.status(500).json({ message: 'Failed to retrieve lists!' });
        return;
    }

    client.close();
    res.status(201).json({ message: 'Lists received', allLists: result });
};
