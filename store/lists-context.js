import { createContext, useState, useContext } from 'react';
import ItemsContext from './items-context';

const ListsContext = createContext({
    allLists: [],
    selectedList: [],
    setLists: () => {},
    selectList: () => {},
    updateList: () => {},
});

export const ListsContextProvider = (props) => {
    const itemsCtx = useContext(ItemsContext);

    const [lists, setLists] = useState([]);
    const [selectedList, setSelectedList] = useState([]);

    const setListsHandler = (lists) => setLists(lists.allLists);

    const selectListHandler = (id) => {
        const list = lists.find((list) => list._id === id);
        if (list) {
            setSelectedList(list);
            // Add items into context in the itemsContext store
            itemsCtx.addItems(list.items);
        }
    };

    const updateListHandler = async () => {
        // Make sure you pull latest version of lists with update
        const lists = await fetch('/api/allLists');
        const { allLists } = await lists.json();
        setLists(allLists);
    };

    const context = {
        allLists: lists,
        selectedList: selectedList,
        setLists: setListsHandler,
        selectList: selectListHandler,
        updateList: updateListHandler,
    };

    return (
        <ListsContext.Provider value={context}>
            {props.children}
        </ListsContext.Provider>
    );
};

export default ListsContext;
