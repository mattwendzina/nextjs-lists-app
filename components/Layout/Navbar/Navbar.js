import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ListsContext from '../../../store/lists-context';

const Navbar = (props) => {
    const listsCtx = useContext(ListsContext);
    const [title, setTitle] = useState('');
    const [edit, toggleEdit] = useState(false);
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
    }, [router.pathname, router.query.title]);

    const updateTitle = async (e) => {
        e.preventDefault();
        const updatedTitle =
            e.type === 'blur' ? e.target.value : e.target[0].value;

        const updatedList = {
            ...listsCtx.selectedList,
            title: updatedTitle,
        };

        listsCtx.updateList(updatedList);

        const updatedUrl = `/lists/${updatedTitle}/${router.query.listId}/`;
        router.replace(updatedUrl);

        toggleEdit(false);
    };

    return (
        <nav className="relative ">
            <div className="inset-center text-white text-3xl ">
                {!edit ? (
                    <p onClick={() => toggleEdit(true)}>{title}</p>
                ) : (
                    <form onSubmit={(e) => updateTitle(e)}>
                        <input
                            className="text-center border-none text-3xl bg-teal-600 focus:ring-teal-600"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={(e) => {
                                updateTitle(e);
                                toggleEdit(false);
                            }}
                            autoFocus={true}
                        />
                    </form>
                )}
            </div>
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
