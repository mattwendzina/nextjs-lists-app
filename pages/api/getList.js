import { connectToDatabase, getList } from '../../helpers/db-utils';

export default async (req, res) => {
    if (req.method !== 'GET') {
        return;
    }

    let client;
    let result;
    const listTitle = req.query;

    try {
        client = await connectToDatabase();
    } catch (e) {
        res.status(500).json({
            message: `GET LIST - Failed to connect to server! - ${e.message}`,
        });
        return;
    }

    try {
        result = await getList(client, listTitle);
    } catch (e) {
        client.close();
        res.status(500).json({ message: 'Failed to retrieve lists!' });
        return;
    }

    client.close();
    res.status(201).json({ message: 'List received', list: result });
};
