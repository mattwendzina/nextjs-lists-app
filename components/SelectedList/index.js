import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getAllLists, updateList } from '../../helpers/api-utils';
import { getDate, hasItemChanged, modifyItems } from '../../helpers/utils';
import Error from 'next/error';
import ListsContext from '../../store/lists-context';
import ItemsContext from '../../store/items-context';
import Input from '../ui/Input/Input';
import Button from '../ui/Button/Button';
import List from '../ui/List/List';

const SelectedList = () => {
    const router = useRouter();
    const listsCtx = useContext(ListsContext);
    const itemsCtx = useContext(ItemsContext);

    const [newItem, setNewItem] = useState('');
    const [errorCode, setErrorCode] = useState();

    const { listId } = router.query;
    const selectedList = listsCtx.selectedList;
    const error = itemsCtx.error;

    useEffect(async () => {
        // Router.query always returns empty on first render, so return out of function
        if (!listId) {
            return;
        }
        // If a user navigates directly to this page, the lists won't have been loaded
        if (listsCtx.allLists.length === 0) {
            try {
                const result = await getAllLists();
                listsCtx.setLists(result.allLists);
            } catch (e) {
                console.error('ERROR: ', e);
                setErrorCode(e.props);
            }
        }

        // NOTE - selectList will in turn call addItems in the itemsCtx so that items can be edited through items store
        listsCtx.selectList(listId);
    }, [listId, listsCtx.allLists]);

    if (errorCode) {
        return <Error statusCode={errorCode.message} />;
    }

    if (selectedList.length === 0) {
        return <p className="p-2 text-xl text-center">Loading...</p>;
    }

    const updateItem = async (value, id) => {
        // If item hasn't been changed, return
        if (!hasItemChanged(selectedList, value, id)) {
            return;
        }

        const updatedList = {
            ...listsCtx.selectedList,
            items: modifyItems(selectedList, 'name', value, id),
        };

        let result;
        try {
            result = await updateList(updatedList);
            console.log('RESULT: ', result);
        } catch (e) {
            console.error('Error - ', e);
            itemsCtx.setError(e.props);
            // Reset list
            listsCtx.selectList(listsCtx.selectedList._id);
        }
    };

    const addNewItem = async (e) => {
        e.preventDefault();

        const newItemToAdd = {
            name: newItem,
            id: uuidv4(),
            checked: false,
            date: getDate(),
        };

        const updatedListItems = [...selectedList.items];
        updatedListItems.unshift(newItemToAdd);
        const updatedList = { ...selectedList, items: updatedListItems };

        const result = await updateList(updatedList);
        console.log('RESULT: ', result);

        // Update UI
        itemsCtx.addItem(newItemToAdd);
        setNewItem('');
    };

    const removeItem = async (id) => {
        const updatedListItems = selectedList.items.filter(
            (item) => item.id !== id
        );

        const updatedList = { ...selectedList, items: updatedListItems };

        let result;
        try {
            result = await updateList(updatedList);
            console.log('RESULT');
            // Update UI
            itemsCtx.removeItem(id);
        } catch (e) {
            console.error('Error - ', e);
            itemsCtx.setError(e.props);
        }
    };

    const toggleChecked = async (checked, id) => {
        const updatedList = {
            ...selectedList,
            items: modifyItems(selectedList, 'checked', !checked, id),
        };

        let result;
        try {
            result = await updateList(updatedList);
            console.log('RESULT: ', result);
        } catch (e) {
            console.error('Error - ', e);
            itemsCtx.setError(e.props);
            // Reset list
            listsCtx.selectList(listsCtx.selectedList._id);
        }
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
                    <Button
                        title="Submit"
                        classes={['mb-0']}
                        disabled={!newItem ? true : false}
                    />
                </div>
            </form>

            <List
                listItems={itemsCtx.items}
                changed={itemsCtx.updateItem}
                blur={updateItem}
                submit={updateItem}
                remove={removeItem}
                toggleChecked={toggleChecked}
            />
            {error && (
                <p className="absolute top-3/4 left-2/4 -translate-x-2/4 transform bg-black p-4 bg-opacity-90 text-yellow-red-900 text-2xl">
                    {error}
                </p>
            )}
        </div>
    );
};

export default SelectedList;
