import ListItem from './ListItem';

const list = (props) => {
    const { listItems, removeItem } = props;

    return (
        <ul className="text-center p-2">
            {listItems &&
                listItems.map((listItem) => (
                    <ListItem
                        key={listItem.id}
                        id={listItem.id}
                        title={listItem.name}
                        removeItem={removeItem}
                    />
                ))}
        </ul>
    );
};

export default list;
