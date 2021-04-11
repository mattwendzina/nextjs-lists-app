import Layout from '../components/Layout/Layout';
import { ItemsContextProvider } from '../store/items-context';
import { ListsContextProvider } from '../store/lists-context';
import '../styles/tailwind.css';

function MyApp({ Component, pageProps }) {
    return (
        <ItemsContextProvider>
            <ListsContextProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ListsContextProvider>
        </ItemsContextProvider>
    );
}

export default MyApp;
