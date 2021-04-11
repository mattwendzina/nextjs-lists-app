import { MongoClient } from 'mongodb';

export default async (req, res) => {
    if (req.method === 'POST') {
        console.log('body', req.body);
        const connectionString =
            'mongodb+srv://mattwendzina:bXKcltQ6Ovq1jl8g@cluster0.a1qam.mongodb.net/listsDatabase?retryWrites=true&w=majority';

        const client = await MongoClient.connect(connectionString);

        const db = client.db();

        const ObjectID = require('mongodb').ObjectID;

        const id = req.body._id;

        let result;
        try {
            result = await db.collection('lists').findOneAndUpdate(
                { _id: new ObjectID(id) },
                {
                    $set: { items: req.body.items, title: req.body.title },
                },
                { upsert: true }
            );
            res.status(201).json({ message: result });
        } catch (e) {
            res.status(404).json({ message: e });
            console.log('ERROR', e);
        }
    }
};
