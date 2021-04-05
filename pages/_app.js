import Layout from '../components/Layout/Layout';
import '../styles/tailwind.css';

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
