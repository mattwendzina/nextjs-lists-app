import { MongoClient } from 'mongodb';

const connectionString = process.env.MONGO_CONNECTION;

export const connectToDatabase = async () => {
    return await MongoClient.connect(connectionString);
};

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
