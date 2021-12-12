import { Fragment, useContext, useEffect } from 'react';
import Error from 'next/error';
import AllLists from '../../components/AllLists/index';
import { connectToDatabase, getAllLists } from '../../helpers/db-utils';
import ListsContext from '../../store/lists-context';

const lists = ({ error, allLists }) => {
    if (error) {
        console.error('ERROR: ', error);
        return <Error statusCode={error.message} />;
    }
    const listsCtx = useContext(ListsContext);

    useEffect(() => {
        listsCtx.setLists(allLists);
    }, []);

    return (
        <Fragment>
            <AllLists allLists={allLists} />
        </Fragment>
    );
};

export async function getServerSideProps() {
    let client;
    let errorCode = false;
    let result = null;

    client = await connectToDatabase();

    const response = await getAllLists(client);

    response.length === 0
        ? (errorCode = { message: 'Failed to retrieve lists!' })
        : (result = JSON.stringify(response));

    return {
        props: {
            error: errorCode,
            allLists: JSON.parse(result),
        },
    };
}

export default lists;
