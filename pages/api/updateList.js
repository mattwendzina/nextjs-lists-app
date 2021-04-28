import { connectToDatabase, updateList } from '../../helpers/db-utils';

export default async (req, res) => {
    if (req.method === 'POST') {
        let client;

        try {
            client = await connectToDatabase();
        } catch (e) {
            res.status(500).json({
                message: `Failed to connect to server! - ${e.message}`,
            });
            return;
        }

        const { _id: id, title, itemss } = req.body;

        let result;
        try {
            result = await updateList(client, id, items, title);
        } catch (e) {
            client.close();
            res.status(404).json({ message: 'Failed to update list! - ', e });
            return;
        }

        client.close();
        res.status(201).json({ message: result });
    }
};
