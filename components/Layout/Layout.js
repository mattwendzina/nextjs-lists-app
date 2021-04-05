import { Fragment } from 'react';
import Navbar from './Navbar/Navbar';

const Layout = (props) => {
    return (
        <Fragment>
            <Navbar />
            <main className="bg-gainsboro-50 h-screen">
                <div className="bg-white min-h-full mx-auto md:max-w-5xl">
                    {props.children}
                </div>
            </main>
        </Fragment>
    );
};

export default Layout;
