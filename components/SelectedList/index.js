import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import ListsContext from '../../store/lists-context';
import ItemsContext from '../../store/items-context';
import Input from '../ui/Input/Input';
import Button from '../ui/Button/Button';
import List from '../CreateList/List';

const hasItemChanged = (list, value, id) => {
    const item = list.items
        .filter((item) => item.id === id)
        .map((item) => item.name);
    return item[0] === value ? true : false;
};

const SelectedList = () => {
    const router = useRouter();
    const listsCtx = useContext(ListsContext);
    const itemsCtx = useContext(ItemsContext);

    const [newItem, setNewItem] = useState('');

    const { listId } = router.query;
    const selectedList = listsCtx.selectedList;

    useEffect(async () => {
        // Router.query always returns empty on first render, so return out of function
        if (!listId) {
            return;
        }
        // If a user navigates directly to this page, the lists won't have been loaded
        // because as standard they get only get fetched on the allLists page.
        if (listsCtx.allLists.length === 0) {
            const response = await fetch('/api/allLists');
            const { allLists } = await response.json();
            // Set all lists in context
            listsCtx.setLists(allLists);
        }

        // NOTE - selectList will in turn call addItems in the itemsCtx so that items can be edited through items store
        listsCtx.selectList(listId);
    }, [listId, listsCtx.allLists]);

    if (selectedList.length === 0) {
        return <p className="p-2 text-xl text-center">Loading...</p>;
    }

    const updateList = (value, id) => {
        if (hasItemChanged(selectedList, value, id)) {
            return;
        }
        // Filter for the itme to selected, then update
        const updatedListItems = selectedList.items.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    name: value,
                };
            }
            return item;
        });

        const updatedList = {
            ...listsCtx.selectedList,
            items: updatedListItems,
        };

        listsCtx.updateList(updatedList);
    };

    const addNewItem = async (e) => {
        e.preventDefault();

        const date = moment().format('MMMM Do YYYY, h:mm:ss a');

        const newItemToAdd = {
            name: newItem,
            id: uuidv4(),
            checked: false,
            date: date,
        };

        const updatedListItems = [...selectedList.items];
        updatedListItems.unshift(newItemToAdd);
        const updatedList = { ...selectedList, items: updatedListItems };

        // Add to databse
        listsCtx.updateList(updatedList);

        // Update UI
        itemsCtx.addItem(newItemToAdd);
        setNewItem('');
    };

    const removeItem = async (id) => {
        const updatedListItems = selectedList.items.filter(
            (item) => item.id !== id
        );

        const updatedList = { ...selectedList, items: updatedListItems };

        // Remove item from databse
        listsCtx.updateList(updatedList);

        // Update UI
        itemsCtx.removeItem(id);
    };

    const toggleChecked = (checked, id) => {
        const updatedListItems = selectedList.items.map((item, i) => {
            if (item.id === id) {
                return {
                    ...item,
                    checked: !checked,
                };
            }
            return item;
        });

        const updatedList = { ...selectedList, items: updatedListItems };

        // Update checked status
        listsCtx.updateList(updatedList);
    };

    return (
        <div>
            <form
                onSubmit={addNewItem}
                className="text-center flex justify-center items-end p-4"
            >
                <Input
                    title="Add a new item"
                    id="listItem"
                    changed={(e) => {
                        setNewItem(e.target.value);
                    }}
                    value={newItem}
                />

                <div>
                    <Button title="Submit" classes={['mb-0']} />
                </div>
            </form>

            <List
                listItems={itemsCtx.items}
                changed={itemsCtx.updateItem}
                blur={updateList}
                submit={updateList}
                remove={removeItem}
                toggleChecked={toggleChecked}
            />
        </div>
    );
};

export default SelectedList;
