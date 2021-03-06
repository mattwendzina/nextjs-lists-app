import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HiOutlineMenu } from 'react-icons/hi';
import { BiHome } from 'react-icons/bi';
import { motion } from 'framer-motion';
import classes from './navbar.module.css';
import { updateList } from '../../../helpers/api-utils';

import ListsContext from '../../../store/lists-context';
import ItemsContext from '../../../store/items-context';
import NavItem from '../NavItem/NavItem';

const Navbar = ({ children, click }) => {
    const listsCtx = useContext(ListsContext);
    const itemsCtx = useContext(ItemsContext);
    const [title, setTitle] = useState({ name: null, editable: false });
    const [edit, toggleEdit] = useState(false);
    const router = useRouter();

    const navItemClasses =
        'hover:text-yellow-red-900 duration-300 text-white px-2 transition text-base sm:text-lg';

    const menuClasses = `${classes.menu} sm:hidden text-xl`;

    const titleClasses =
        'order-1 sm:order-none text-white text-lg xs:text-2xl text-center px-2 flex-grow';

    useEffect(() => {
        switch (router.pathname) {
            case '/createList':
                return setTitle(() => {
                    return { name: 'Create List', editable: false };
                });
            case '/lists':
                return setTitle(() => {
                    return { name: 'All Lists', editable: false };
                });
            case '/lists/[title]/[listId]':
                return setTitle(() => {
                    return { name: `${router.query.title}`, editable: true };
                });
            default:
                return setTitle('');
        }
    }, [router.pathname, router.query.title]);

    const Home = () => (
        <Link href="/">
            <a>
                <BiHome className="text-white text-2xl cursor-pointer hover:text-yellow-red-900 transition duration-300" />
            </a>
        </Link>
    );

    const updateTitle = async (e) => {
        e.preventDefault();
        const updatedTitle =
            e.type === 'blur' ? e.target.value : e.target[0].value;

        const updatedList = {
            ...listsCtx.selectedList,
            title: updatedTitle,
        };

        let result;
        try {
            result = await updateList(updatedList);
            listsCtx.refreshList();
            console.log('RESULT: ', result);
        } catch (e) {
            console.error('Error - ', e);
            itemsCtx.setError(e.props);
            // Reset list
            listsCtx.selectList(listsCtx.selectedList._id);
        }

        const updatedUrl = `/lists/${updatedTitle}/${router.query.listId}/`;
        router.replace(updatedUrl);

        toggleEdit(false);
    };

    return (
        <nav className="relative ">
            <div className="flex p-5 gap-x-2 bg-teal-600 justify-between items-center ">
                <div className="hidden sm:flex w-1/6 pl-2">
                    <Home />
                </div>
                <div className={titleClasses}>
                    {edit && title.editable ? (
                        <form onSubmit={(e) => updateTitle(e)}>
                            <input
                                className="text-center border-none text-2xl bg-teal-600 focus:ring-teal-600 p-0"
                                type="text"
                                value={title.name}
                                onChange={(e) =>
                                    setTitle({ ...title, name: e.target.value })
                                }
                                onBlur={(e) => {
                                    updateTitle(e);
                                    toggleEdit(false);
                                }}
                                autoFocus={true}
                            />
                        </form>
                    ) : (
                        <p
                            onClick={() => title.editable && toggleEdit(true)}
                            className={
                                title.editable
                                    ? 'cursor-pointer hover:text-yellow-red-900 transition duration-300'
                                    : null
                            }
                        >
                            {title.name}
                        </p>
                    )}
                </div>
                <div className="hidden sm:flex md:w-1/5 lg:w-1/6 justify-center">
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

                <motion.div
                    layoutId="drawer"
                    onClick={click}
                    className={menuClasses}
                >
                    <HiOutlineMenu className="text-white xs:text-2xl" />
                </motion.div>
            </div>
            <div>{children}</div>
        </nav>
    );
};

export default Navbar;
