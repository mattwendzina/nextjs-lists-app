import NavItem from '../NavItem/NavItem';

const SideDrawer = ({ click }) => {
    const navClasses =
        'hover:text-yellow-red-900 duration-300 text-white p-1 transition text-2xl m-2';
    const sideDrawerClasses =
        'absolute top-0 bottom-0 left-0 right-0 bg-charcoal-600 z-10 h-full';

    return (
        <div className={sideDrawerClasses}>
            <ul className="flex flex-col justify-center items-center p-2">
                <div
                    className="text-white text-2xl absolute top-1 right-4"
                    onClick={click}
                >
                    x
                </div>
                <NavItem link={'/'} title="Home" classes={navClasses} />
                <NavItem
                    link={'/lists'}
                    title="All Lists"
                    classes={navClasses}
                />
                <NavItem
                    link={'/createList'}
                    title="Create"
                    classes={navClasses}
                />
            </ul>
        </div>
    );
};

export default SideDrawer;
