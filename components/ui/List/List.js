import ListItem from '../ListItem/ListItem';

const list = (props) => {
    const { listItems, remove, changed, blur, submit, toggleChecked } = props;

    return (
        <ul className="text-center p-2">
            {listItems &&
                listItems.map((listItem) => (
                    <ListItem
                        key={listItem.id}
                        id={listItem.id}
                        title={listItem.name}
                        checked={listItem.checked}
                        remove={remove}
                        changed={changed}
                        blur={blur}
                        submit={submit}
                        toggleChecked={toggleChecked}
                    />
                ))}
        </ul>
    );
};

export default list;
