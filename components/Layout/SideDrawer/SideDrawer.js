import NavItem from '../NavItem/NavItem';
import { IoCloseOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';

const SideDrawer = ({ click }) => {
    const navClasses =
        'hover:text-yellow-red-900 duration-300 text-white p-1 transition text-2xl m-2';
    const sideDrawerClasses =
        'absolute top-0 bottom-0 left-0 right-0 bg-charcoal-600 z-10 h-full';

    return (
        <motion.div className={sideDrawerClasses} layoutId="drawer">
            <ul className="flex flex-col justify-center items-center p-2">
                <div
                    className="text-white text-2xl absolute top-3 right-3"
                    onClick={click}
                >
                    <IoCloseOutline />
                </div>
                <NavItem
                    link={'/'}
                    title="Home"
                    classes={navClasses}
                    click={click}
                />
                <NavItem
                    link={'/lists'}
                    title="All Lists"
                    classes={navClasses}
                    click={click}
                />
                <NavItem
                    link={'/createList'}
                    title="Create"
                    classes={navClasses}
                    click={click}
                />
            </ul>
        </motion.div>
    );
};

export default SideDrawer;
