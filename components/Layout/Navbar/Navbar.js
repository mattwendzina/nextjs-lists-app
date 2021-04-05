import Link from 'next/link';

const Navbar = (props) => {
    return (
        <nav>
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
