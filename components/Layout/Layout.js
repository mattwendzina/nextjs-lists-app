import { useState } from 'react';
import Navbar from './Navbar/Navbar';
import SideDrawer from './SideDrawer/SideDrawer';

const Layout = (props) => {
    const [showDrawer, toggleShowDrawer] = useState(false);

    return (
        <div className="flex flex-col h-screen">
            <div>
                <Navbar
                    click={() => {
                        console.log('clicked');
                        toggleShowDrawer(!showDrawer);
                    }}
                />
                {showDrawer && (
                    <SideDrawer click={() => toggleShowDrawer(!showDrawer)} />
                )}
            </div>
            <main className="bg-gainsboro-50 flex-1 h-full">
                <div className="bg-white mx-auto md:max-w-5xl h-full overflow-scroll">
                    {props.children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
