import { createContext, useState, useContext } from 'react';
import ItemsContext from './items-context';

const ListsContext = createContext({
    allLists: [],
    selectedList: [],
    setLists: () => {},
    selectList: () => {},
    refreshList: () => {},
});

export const ListsContextProvider = (props) => {
    const itemsCtx = useContext(ItemsContext);

    const [lists, setLists] = useState([]);
    const [selectedList, setSelectedList] = useState([]);

    const setListsHandler = (lists) => setLists(lists);

    const selectListHandler = (id) => {
        const list = lists.find((list) => list._id === id);
        if (list) {
            setSelectedList(list);
            // Add items into context in the itemsContext store
            itemsCtx.addItems(list.items);
        }
    };

    const refreshListHandler = async () => {
        const lists = await fetch('/api/allLists');
        const { allLists } = await lists.json();
        setLists(allLists);
    };

    const context = {
        allLists: lists,
        selectedList: selectedList,
        setLists: setListsHandler,
        selectList: selectListHandler,
        refreshList: refreshListHandler,
    };

    return (
        <ListsContext.Provider value={context}>
            {props.children}
        </ListsContext.Provider>
    );
};

export default ListsContext;
