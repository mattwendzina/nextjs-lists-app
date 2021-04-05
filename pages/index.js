import { Fragment } from 'react';
import Head from 'next/head';
import Homepage from '../components/Homepage/Homepage';

export default function Home() {
    return (
        <Fragment>
            <Head>
                <title>Matt Wendzina</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Homepage />
        </Fragment>
    );
}
