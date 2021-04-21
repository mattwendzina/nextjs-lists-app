import NavItem from '../NavItem/NavItem';

const SideDrawer = () => {
    const navClasses =
        'hover:text-yellow-red-900 duration-300 text-white p-1 transition text-2xl m-2';

    return (
        <div className="absolute top-0 bottom-0 left-1/4 right-0 bg-charcoal-600 z-10 h-full">
            <ul className="flex flex-col justify-center items-center">
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
