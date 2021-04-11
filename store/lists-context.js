import { createContext, useState } from 'react';

const ListsContext = createContext({
    allLists: [],
    setLists: () => {},
});

export const ListsContextProvider = (props) => {
    const [lists, setLists] = useState([]);

    const updateListsHandler = (lists) => setLists(lists);

    const context = {
        allLists: lists,
        setLists: updateListsHandler,
    };

    return (
        <ListsContext.Provider value={context}>
            {props.children}
        </ListsContext.Provider>
    );
};

export default ListsContext;
