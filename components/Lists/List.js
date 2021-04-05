import ListItem from './ListItem';

const list = (props) => {
    const { listItems } = props;

    return (
        <ul className="text-center p-2">
            {listItems &&
                listItems.map((listItem) => <ListItem title={listItem.name} />)}
        </ul>
    );
};

export default list;
