import { connectToDatabase, getAllLists } from '../../helpers/db-utils';

export default async (req, res) => {
    if (req.method !== 'GET') {
        return;
    }

    let client;
    let result;

    try {
        client = await connectToDatabase();
    } catch (e) {
        res.status(500).json({
            message: `ALL LISTS - Failed to connect to server! - ${e.message}`,
        });
        return;
    }

    try {
        result = await getAllLists(client);
    } catch (e) {
        client.close();
        res.status(500).json({ message: 'Failed to retrieve lists!' });
        return;
    }

    client.close();
    res.status(201).json({ message: 'Lists received', allLists: result });
};
