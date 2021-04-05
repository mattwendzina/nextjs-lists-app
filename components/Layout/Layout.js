import { Fragment } from 'react';
import Navbar from './Navbar/Navbar';

const Layout = (props) => {
    return (
        <div className="flex flex-col h-screen">
            <div>
                <Navbar />
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
