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
        setItems(
            items.map((item) => {
                if (item['id'] === id) {
                    return { ...item, name: value };
                }
                return item;
            })
        );
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
