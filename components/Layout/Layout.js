import Navbar from './Navbar/Navbar';
import SideDrawer from './SideDrawer/SideDrawer';

const Layout = (props) => {
    return (
        <div className="flex flex-col h-screen">
            <div>
                <Navbar />
                <SideDrawer />
            </div>
            <main className="bg-gainsboro-50 flex-1 h-full">
                <div className="bg-white mx-auto md:max-w-5xl h-full">
                    {props.children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
