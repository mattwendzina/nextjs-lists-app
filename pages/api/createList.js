import { MongoClient } from 'mongodb';
const List = require('../../models/lists');

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const newList = req.body;

        newList.items = JSON.parse(req.body.items);

        const connectionString = process.env.MONGO_CONNECTION;

        const client = await MongoClient.connect(connectionString);

        const db = client.db();

        const exists = await db
            .collection('lists')
            .findOne({ title: newList.title });

        if (exists) {
            res.status(303).json({
                message:
                    'List with this title already exists! Please choose another',
            });
            client.close();
            return;
        }

        try {
            console.log('SAVE NEW LIST...');
            const list = new List();
            list.title = 'Another List';
            list.items = [
                { name: '1', id: 1234, checked: false },
                { name: '2', id: 2234, checked: false },
                { name: '3', id: 3234, checked: true },
            ];
            const result = await db.collection('lists').insertOne(list);
            res.status(201).json({ message: 'New list created!' });
            client.close();
            return;
        } catch (e) {
            console.log('ERROR: ', e);
            client.close();
            return e;
        }
    }
};

export default handler;
