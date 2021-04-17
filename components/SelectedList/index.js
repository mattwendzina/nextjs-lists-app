import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FiDelete } from 'react-icons/fi';
import ListsContext from '../../store/lists-context';
import ItemsContext from '../../store/items-context';
import Input from '../ui/Input/Input';
import Button from '../ui/Button/Button';
import classes from './index.module.css';
import List from '../CreateList/List';

const SelectedList = () => {
    const router = useRouter();
    const listsCtx = useContext(ListsContext);
    const itemsCtx = useContext(ItemsContext);

    const [itemToUpdate, setItemToUpdate] = useState({ name: '', id: '' });
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

    const liClassNames = `${classes.listItem} relative group cursor-pointer mx-auto w-max flex justify-center items-center`;

    const updateList = (e) => {
        e.preventDefault();

        // Filter for the itme to selected, then updates
        const updatedListItems = selectedList.items.map((item) => {
            if (item.id === itemToUpdate.id) {
                return { ...item, name: itemToUpdate.name };
            }
            return item;
        });

        // Update the list in state
        updateSelectedList((prevState) => {
            const updatedList = { ...prevState, items: updatedListItems };

            // TODO - Add in some error handling so that if it fails, don't update state, but send a failure message to user
            // Update in database
            itemsCtx.updateList(updatedList);

            // Update in state
            return updatedList;
        });

        // Clear the input button
        setItemToUpdate({ name: '', id: '' });
    };

    const addNewItem = async (e) => {
        e.preventDefault();
        const newItemToAdd = {
            name: newItem,
            id: uuidv4(),
        };

        const updatedListItems = [...selectedList.items];
        updatedListItems.unshift(newItemToAdd);
        const updatedList = { ...selectedList, items: updatedListItems };

        // Add to databse
        const response = await fetch('/api/updateList', {
            method: 'POST',
            body: JSON.stringify(updatedList),
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        console.log('DATA: ', data);

        updateSelectedList(updatedList);
        setNewItem('');
    };

    const removeItem = async (id) => {
        const updatedListItems = selectedList.items.filter(
            (item) => item.id !== id
        );

        const updatedList = { ...selectedList, items: updatedListItems };

        // Remove item from databse
        const response = await fetch('/api/updateList', {
            method: 'POST',
            body: JSON.stringify(updatedList),
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        console.log('DATA: ', data);

        updateSelectedList(updatedList);
    };

    console.log('selectedList.items', selectedList.items);
    // console.log('itemsCtx.removeItem', itemsCtx.removeItem);
    return (
        <div>
            {/* Conditional based on whether user wants to update an item or add a new one. */}
            {/* {itemToUpdate.name ? (
                <form
                    onSubmit={updateList}
                    className="text-center flex justify-center items-end p-4"
                >
                    <Input
                        title="Update item"
                        id="listItem"
                        changed={(e) => {
                            if (itemToUpdate.name) {
                                setItemToUpdate((prevState) => {
                                    return {
                                        ...prevState,
                                        name: e.target.value,
                                    };
                                });
                            }
                        }}
                        value={itemToUpdate.name}
                    />

                    <div>
                        <Button title="Update" classes={['mb-0']} />
                        <Button
                            title="Cancel"
                            type="button"
                            classes={['mb-0']}
                            click={() => setItemToUpdate({ name: '', id: '' })}
                        />
                    </div>
                </form>
            ) : (
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
            )} */}

            {/* {itemsCtx.items && ( */}
            <List listItems={itemsCtx.items} removeItem={itemsCtx.removeItem} />
            {/* )} */}

            {/* <ul className="text-center p-2 w-max mx-auto">
                {selectedList.items.map((item) => (
                    <li key={item.id} className={liClassNames}>
                        <div>
                            <p
                                className="text-lg"
                                onClick={() =>
                                    setItemToUpdate({
                                        name: item.name,
                                        id: item.id,
                                    })
                                }
                            >
                                {item.name}
                            </p>
                            <FiDelete
                                className={classes.icon}
                                onClick={() => removeItem(item.id)}
                            />
                        </div>
                    </li>
                ))}
            </ul> */}
        </div>
    );
};

export default SelectedList;
