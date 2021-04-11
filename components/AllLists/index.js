import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import ListsContext from '../../store/lists-context';

const AllLists = () => {
    const [listNames, setListNames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const listsCtx = useContext(ListsContext);

    useEffect(async () => {
        const response = await fetch('/api/allLists', {
            method: 'GET',
        });
        const { allLists } = await response.json();
        setIsLoading(false);
        setListNames(allLists.map((list) => list));
        listsCtx.setLists(allLists);
    }, []);

    if (isLoading) {
        return <p className="text-center text-xl"> Loading...</p>;
    }

    return (
        <div className="text-center w-max mx-auto ">
            <ul>
                {listNames.map((list) => {
                    return (
                        <li
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
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default AllLists;
