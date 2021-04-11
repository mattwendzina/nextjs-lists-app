import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const newList = req.body;

        newList.items = JSON.parse(req.body.items);

        const connectionString =
            'mongodb+srv://mattwendzina:bXKcltQ6Ovq1jl8g@cluster0.a1qam.mongodb.net/listsDatabase?retryWrites=true&w=majority';

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
            const result = await db.collection('lists').insertOne(newList);
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
