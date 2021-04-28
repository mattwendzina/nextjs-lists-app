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

export const updateList = async (updatedList) => {
    const res = await fetch('/api/updateList', {
        method: 'POST',
        body: JSON.stringify(updatedList),
        headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
        return res.json();
    }
    return res.json().then((data) => {
        throw new Error({
            message: 'Failed to update list!',
            data: data,
        });
    });
};
