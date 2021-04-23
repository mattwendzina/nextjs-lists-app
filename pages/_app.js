import { AnimateSharedLayout } from 'framer-motion';

import Layout from '../components/Layout/Layout';
import { ItemsContextProvider } from '../store/items-context';
import { ListsContextProvider } from '../store/lists-context';
import '../styles/tailwind.css';

function MyApp({ Component, pageProps }) {
    return (
        <AnimateSharedLayout>
            <ItemsContextProvider>
                <ListsContextProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ListsContextProvider>
            </ItemsContextProvider>
        </AnimateSharedLayout>
    );
}

export default MyApp;
