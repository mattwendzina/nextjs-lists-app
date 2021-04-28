import { Fragment } from 'react';
import Error from 'next/error';
import Head from 'next/head';
import Homepage from '../components/Homepage/Homepage';
import { getAllLists } from '../helpers/api-utils';

export default function Home({ error, allLists }) {
    if (error) {
        console.error('ERROR: ', error);
        return <Error statusCode={error.message} />;
    }

    return (
        <Fragment>
            <Head>
                <title>Matt Wendzina</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Homepage allLists={allLists} />
        </Fragment>
    );
}

export async function getServerSideProps() {
    let lists = null;
    let errorCode = false;
    try {
        lists = await getAllLists();
    } catch (e) {
        errorCode = e.props;
    }

    return {
        props: {
            error: errorCode,
            allLists: lists,
        },
    };
}
