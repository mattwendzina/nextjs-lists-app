import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import ListsContext from '../../../store/lists-context';
import NavItem from '../NavItem/NavItem';

const Navbar = ({ children, mobile, click }) => {
    const listsCtx = useContext(ListsContext);
    const [title, setTitle] = useState('');
    const [edit, toggleEdit] = useState(false);
    const router = useRouter();
    const navItemClasses =
        'hover:text-yellow-red-900 duration-300 text-white p-1 transition text-base sm:text-lg';

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
            <div className="inset-center text-white text-base sm:text-3xl ">
                {!edit ? (
                    <p onClick={() => toggleEdit(true)}>{title}</p>
                ) : (
                    <form onSubmit={(e) => updateTitle(e)}>
                        <input
                            className="text-center border-none git  focus:ring-teal-600"
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
            <div className="flex p-3 gap-x-2 bg-teal-600 justify-between items-center ">
                <NavItem link={'/'} title="Home" classes={navItemClasses} />
                {mobile ? (
                    <div className="flex-col sm:flex-row">
                        <NavItem
                            link={'/lists'}
                            title="All Lists"
                            classes={navItemClasses}
                        />
                        <NavItem
                            link={'/createList'}
                            title="Create"
                            classes={navItemClasses}
                        />
                    </div>
                ) : (
                    <div onClick={click}> Ham </div>
                )}
            </div>
            <div>{children}</div>
        </nav>
    );
};

export default Navbar;
