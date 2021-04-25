import Error from 'next/error';
import { server } from '../config/index';

export const getAllLists = async () => {
    const res = await fetch(`${server}/api/allLists`, {
        method: 'GET',
    });
    if (res.ok) {
        return res.json();
    }
    return res.json().then((data) => {
        throw new Error({
            message: 'Failed to connect to server!',
            data: data,
        });
    });
};
