import { Fragment, useContext } from 'react';
import AllLists from '../../components/AllLists/index';
import { getAllLists } from '../../helpers/api-utils';
import ListsContext from '../../store/lists-context';

const lists = ({ allLists }) => {
    const listsCtx = useContext(ListsContext);
    let lists;
    listsCtx.allLists.length === 0
        ? (lists = allLists)
        : (lists = listsCtx.allLists);

    return (
        <Fragment>
            <AllLists allLists={lists} />
        </Fragment>
    );
};

export async function getServerSideProps() {
    let result = null;
    let errorCode = false;
    try {
        result = await getAllLists();
    } catch (e) {
        errorCode = e.props;
    }
    return {
        props: {
            allLists: result && result.allLists,
        },
    };
}

export default lists;
