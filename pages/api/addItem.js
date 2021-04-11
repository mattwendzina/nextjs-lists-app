import { MongoClient } from 'mongodb';

export default async (req, res) => {
    if (req.method === 'POST') {
        console.log('body', req.body);
        const connectionString =
            'mongodb+srv://mattwendzina:bXKcltQ6Ovq1jl8g@cluster0.a1qam.mongodb.net/listsDatabase?retryWrites=true&w=majority';

        const client = await MongoClient.connect(connectionString);

        const db = client.db();
    }
};
