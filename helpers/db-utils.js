import { MongoClient } from "mongodb";

const mongoAtlasConnectionString = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTERNAME}.4mcqr.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;

export const connectToDatabase = async () =>
  await MongoClient.connect(mongoAtlasConnectionString);

export const getAllLists = async (client) => {
  const db = client.db();
  return await db.collection("lists").find().toArray();
};

export const updateList = async (client, id, items, title) => {
  const db = client.db();

  const ObjectID = require("mongodb").ObjectID;

  return await db.collection("lists").findOneAndUpdate(
    { _id: new ObjectID(id) },
    {
      $set: { items: items, title: title },
    },
    { upsert: true }
  );
};
