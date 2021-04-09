import { createContext, useState } from 'react';

const ItemsContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (itemId) => {},
    updateItem: (itemId) => {},
});

export const ItemsContextProvider = (props) => {
    const [items, setItems] = useState([]);

    const addItemHandler = (item) => {
        setItems((prevItems) => {
            const newItemsList = prevItems;
            newItemsList.unshift(item);
            return newItemsList;
        });
    };

    const removeItemHandler = (itemId) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    const updateItemHandler = (value, id) => {
        setItems((prevState) => {
            const updatedItems = items
                .map((item, idx) => {
                    if (item['id'] === id) {
                        // Convulted but... Need to deal with scenario where a user has deleted a word. At that state,
                        // they may start typing a new one, or click away expecting it to be deleted. We need to look at the prevState
                        // so we can compare with the next incoming value. IE, if prevState is an empty string, and the current value is
                        // an empty string then they must want to delete - in which case, come into this if block. If the value is a
                        // character though, then they must be adding a new item.
                        if (prevState[idx].name === '' && value === '') {
                            return { ...item, name: value, removeItem: true };
                        }
                        return { ...item, name: value };
                    }
                    return item;
                })
                .filter((item) => {
                    if (item.removeItem) {
                        return false;
                    }
                    return item;
                });
            return updatedItems;
        });
    };

    const context = {
        items: items,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        updateItem: updateItemHandler,
    };

    return (
        <ItemsContext.Provider value={context}>
            {props.children}
        </ItemsContext.Provider>
    );
};

export default ItemsContext;
