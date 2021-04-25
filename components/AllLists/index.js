import { useEffect, useContext, useState } from 'react';
import Error from 'next/error';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ListsContext from '../../store/lists-context';

const AllLists = () => {
    const [error, setError] = useState();
    const listsCtx = useContext(ListsContext);

    useEffect(async () => {
        if (listsCtx.allLists.length === 0) {
            const response = await fetch('/api/allLists', {
                method: 'GET',
            });
            if (!response.ok) {
                const data = await response.json();
                setError({
                    message: 'Failed to get lists!',
                    data: data.message,
                });
                return;
            }
            const { allLists } = await response.json();
            listsCtx.setLists(allLists);
        }
    }, []);

    if (error) {
        return <Error statusCode={error.message} />;
    }

    if (listsCtx.allLists.length === 0) {
        return <p className="text-center text-xl"> Loading...</p>;
    }

    return (
        <div className="text-center w-max mx-auto ">
            <ul>
                {listsCtx.allLists.map((list) => {
                    return (
                        <motion.li
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            key={list._id}
                            className="text-2xl p-2 cursor-pointer hover:text-yellow-red-900 transition duration-200 ease-in-out"
                        >
                            <Link
                                href={{
                                    pathname: `/lists/[title]/[listId]`,
                                    query: {
                                        listId: list._id,
                                        title: list.title,
                                    },
                                }}
                            >
                                {list.title}
                            </Link>
                        </motion.li>
                    );
                })}
            </ul>
        </div>
    );
};

export default AllLists;
