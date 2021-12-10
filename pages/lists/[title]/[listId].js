import List from '../../../components/SelectedList/index';
import { getList } from '../../../helpers/api-utils';

const selectedList = ({ selectedList }) => <List selectedList={selectedList} />;

export async function getServerSideProps(context) {
    let result = null;
    let errorCode = false;
    const listTitle = context.query.title;

    try {
        result = await getList(listTitle);
    } catch (e) {
        errorCode = e.props;
    }
    return {
        props: {
            selectedList: result && result.list,
        },
    };
}

export default selectedList;
