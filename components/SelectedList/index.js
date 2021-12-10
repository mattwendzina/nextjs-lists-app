import { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { updateList } from '../../helpers/api-utils';
import { getDate, hasItemChanged, modifyItems } from '../../helpers/utils';
import Error from 'next/error';
import ListsContext from '../../store/lists-context';
import ItemsContext from '../../store/items-context';
import Input from '../ui/Input/Input';
import Button from '../ui/Button/Button';
import List from '../ui/List/List';

const SelectedList = ({ selectedList }) => {
    const listsCtx = useContext(ListsContext);
    const itemsCtx = useContext(ItemsContext);

    const [newItem, setNewItem] = useState('');
    const [errorCode, setErrorCode] = useState();
    const [timeout, setTimeout] = useState();

    const error = itemsCtx.error;

    if (errorCode) {
        return <Error statusCode={errorCode.message} />;
    }

    if (!selectedList) {
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

        let result;
        try {
            result = await updateList(updatedList);
            console.log('RESULT: ', result);
            // Update UI
            itemsCtx.addItem(newItemToAdd);
            setNewItem('');
        } catch (e) {
            console.error('Error - ', e);
            itemsCtx.setError(e.props);
            // Reset list
            listsCtx.selectList(listsCtx.selectedList._id);
        }
    };

    const debounceFunction = (updatedList, time) => {
        if (timeout) {
            clearTimeout(deleteTimeout);
        }
        setTimeout(
            setTimeout(async () => {
                try {
                    const result = await updateList(updatedList);
                    console.log('RESULT: ', result);
                } catch (e) {
                    console.error('Error - ', e);
                    itemsCtx.setError(e.props);
                    // Reset list
                    listsCtx.selectList(listsCtx.selectedList._id);
                }
            }, time)
        );
    };

    const removeItem = async (id) => {
        const updatedListItems = selectedList.items.filter(
            (item) => item.id !== id
        );
        const updatedList = { ...selectedList, items: updatedListItems };
        itemsCtx.removeItem(id);
        listsCtx.updateList(updatedList);
        debounceFunction(updatedList, 1500);
    };

    const toggleChecked = async (checked, id) => {
        const updatedList = {
            ...selectedList,
            items: modifyItems(selectedList, 'checked', !checked, id),
        };
        listsCtx.updateList(updatedList);
        debounceFunction(updatedList, 1500);
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
                listItems={selectedList.items}
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
