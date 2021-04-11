import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Navbar = (props) => {
    const [title, setTitle] = useState();
    const router = useRouter();

    useEffect(() => {
        switch (router.pathname) {
            case '/createList':
                return setTitle('Create List');
            case '/lists':
                return setTitle('All Lists');
            case '/lists/[title]/[listId]':
                return setTitle(`${router.query.title}`);
            default:
                return setTitle('');
        }
    });

    return (
        <nav className="relative">
            <div className="inset-center text-white text-3xl ">{title}</div>
            <div className="flex p-3 gap-x-2 bg-teal-600 justify-between items-center">
                <Link href="/">
                    <a className="hover:text-yellow-red-900 duration-300 text-white p-1 transition">
                        Home
                    </a>
                </Link>
                <div>
                    <Link href="/lists">
                        <a className="hover:text-yellow-red-900 duration-300 text-white px-2 transition">
                            All Lists
                        </a>
                    </Link>
                    <Link href="/createList">
                        <a className="hover:text-yellow-red-900 duration-300 text-white px-2 transition">
                            Create
                        </a>
                    </Link>
                </div>
            </div>
            <div>{props.children}</div>
        </nav>
    );
};

export default Navbar;
