import Layout from '../components/Layout/Layout';
import { ItemsContextProvider } from '../store/items-context';
import '../styles/tailwind.css';

function MyApp({ Component, pageProps }) {
    return (
        <ItemsContextProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ItemsContextProvider>
    );
}

export default MyApp;
