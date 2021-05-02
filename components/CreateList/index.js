import { useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getDate } from '../../helpers/utils';

import Input from '../ui/Input/Input';
import Button from '../ui/Button/Button';
import List from '../ui/List/List';
import ItemsContext from '../../store/items-context';
import TitleItem from '../ui/TitleItem/TitleItem';

const CreateList = () => {
    const itemsCtx = useContext(ItemsContext);

    const [title, setTitle] = useState('List Name');
    const [item, setItem] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Ensure list is cleared before loading page. (State for displaying
        // list items is shared with displaying individual lists)
        itemsCtx.clearItems();
        setIsLoading(false);
    }, []);

    const onSubmitItem = (e) => {
        e.preventDefault();
        if (item === '') {
            console.log('return');
            return;
        }

        const newItem = {
            name: item,
            id: uuidv4(),
            checked: false,
            date: getDate(),
        };
        itemsCtx.addItem(newItem);
        setItem('');
    };

    const removeItemHandler = (id) => itemsCtx.removeItem(id);

    const submitFormHandler = async () => {
        const newList = {
            title: title,
            items: JSON.stringify(itemsCtx.items),
        };

        const result = await fetch('/api/createList', {
            method: 'POST',
            body: JSON.stringify(newList),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await result.json();
        console.log('DATA:', data);
        itemsCtx.clearItems();
        setTitle('New List');
    };

    if (isLoading) {
        return <p className="text-center text-xl p-2"> Loading...</p>;
    }

    return (
        <div className="md:flex">
            <div className="p-3">
                <form onSubmit={onSubmitItem} className="text-center">
                    <Input
                        title="Add Item"
                        id="listItem"
                        changed={(e) => setItem(e.target.value)}
                        value={item}
                    />
                    <Button title="Submit" disabled={!item ? true : false} />
                </form>
            </div>
            <div className="px-10 m-10 border-2 flex-grow rounded-md">
                <div className="text-center border-b pt-3 w-3/6 mx-auto border-yellow-red-900">
                    <TitleItem
                        value={title}
                        remove={removeItemHandler}
                        changed={setTitle}
                        blur={itemsCtx.updateItem}
                    />
                </div>

                <List
                    listItems={itemsCtx.items}
                    remove={removeItemHandler}
                    changed={itemsCtx.updateItem}
                    blur={itemsCtx.updateItem}
                />

                {itemsCtx.items.length > 0 && (
                    <div className="mx-auto w-full text-center m-4">
                        <Button title="Create List" click={submitFormHandler} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateList;
