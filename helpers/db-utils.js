import { MongoClient } from 'mongodb';

const connectionString =
    'mongodb+srv://mattwendzina:bXKcltQ6Ovq1jl8g@cluster0.a1qam.mongodb.net/listsDatabase?retryWrites=true&w=majority';

export const connectToDatabase = async () =>
    await MongoClient.connect(connectionString);

export const getAllLists = async (client) => {
    const db = client.db();
    return await db.collection('lists').find().toArray();
};

export const updateList = async (client, id, items, title) => {
    const db = client.db();

    const ObjectID = require('mongodb').ObjectID;

    return await db.collection('lists').findOneAndUpdate(
        { _id: new ObjectID(id) },
        {
            $set: { items: items, title: title },
        },
        { upsert: true }
    );
};
