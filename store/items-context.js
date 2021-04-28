import { createContext, useState } from 'react';

const ItemsContext = createContext({
    items: [],
    error: '',
    addItem: (item) => {},
    addItems: (items) => {},
    removeItem: (itemId) => {},
    updateItem: (itemId) => {},
    clearItems: () => {},
    setError: () => {},
});

export const ItemsContextProvider = (props) => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    const addItemHandler = (item) => {
        setItems((prevItems) => {
            const newItemsList = prevItems;
            newItemsList.unshift(item);
            return newItemsList;
        });
    };

    const addItemsHandler = (items) => setItems(items);

    const removeItemHandler = (itemId) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    const clearItemsHandler = () => setItems([]);

    const updateItemHandler = (value, id, action) => {
        setItems((prevState) => {
            const updatedItems = items
                .map((item, idx) => {
                    if (item['id'] === id) {
                        // Convulted but... Need to deal with scenario where a user has deleted a word using backspace (ie, has hit backspace
                        // enough times to remove the word). At that state, they may start typing a new one,
                        // or click away expecting it to be deleted. We need to look at the prevState
                        // so we can compare with the next incoming value. IE, if prevState is an empty string, and the current value is
                        // an empty string then they must want to delete - in which case, come into this if block. If the value is a
                        // character though, then they must have started typing a new item.
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

    const setErrorHandler = (data) => {
        setError(data.message);
        setTimeout(() => {
            setError(null);
        }, 3000);
    };

    const context = {
        items: items,
        error: error,
        addItem: addItemHandler,
        addItems: addItemsHandler,
        removeItem: removeItemHandler,
        updateItem: updateItemHandler,
        clearItems: clearItemsHandler,
        setError: setErrorHandler,
    };

    return (
        <ItemsContext.Provider value={context}>
            {props.children}
        </ItemsContext.Provider>
    );
};

export default ItemsContext;
