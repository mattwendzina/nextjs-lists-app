import { createContext, useState } from 'react';

const ListsContext = createContext({
    allLists: [],
    selectedList: [],
    setLists: () => {},
    selectList: () => {},
});

export const ListsContextProvider = (props) => {
    const [lists, setLists] = useState([]);
    const [selectedList, setSelectedList] = useState([]);

    const updateListsHandler = (lists) => setLists(lists);

    const selectListHandler = (id) => {
        const list = lists.find((list) => list._id === id);
        if (list) {
            setSelectedList(list);
        }
    };

    const context = {
        allLists: lists,
        selectedList: selectedList,
        setLists: updateListsHandler,
        selectList: selectListHandler,
    };

    return (
        <ListsContext.Provider value={context}>
            {props.children}
        </ListsContext.Provider>
    );
};

export default ListsContext;
