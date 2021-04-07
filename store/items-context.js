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
        setItems(() => {
            const itemToUpdate = items.find((item) => item.id === id);
            const newItemsList = items.map((item) => {
                if (item['id'] === itemToUpdate.id) {
                    return { ...item, name: value };
                }
                return item;
            });
            return newItemsList;
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
