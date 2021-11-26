import { motion } from 'framer-motion';
import Link from 'next/link';

const AllLists = ({ allLists }) => (
    <div className="text-center w-max mx-auto ">
        <ul>
            {allLists.map((list) => {
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

export default AllLists;
