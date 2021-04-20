import { useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Input from '../ui/Input/Input';
import Button from '../ui/Button/Button';
import List from '../ui/List/List';
import ItemsContext from '../../store/items-context';

const CreateList = () => {
    const itemsCtx = useContext(ItemsContext);

    const [title, setTitle] = useState('');
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
        const newItem = { name: item, id: uuidv4() };
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
        setTitle('');
    };

    if (isLoading) {
        return <p className="text-center text-xl p-2"> Loading...</p>;
    }

    return (
        <div className="md:flex">
            <div className="p-3">
                <div className="text-center">
                    <Input
                        title="List name"
                        id="listName"
                        value={title}
                        changed={(e) => setTitle(e.target.value)}
                    />
                </div>

                <form onSubmit={onSubmitItem} className="text-center">
                    <Input
                        title="Item name"
                        id="listItem"
                        changed={(e) => setItem(e.target.value)}
                        value={item}
                    />
                    <Button title="Submit" />
                </form>
            </div>
            <div className="px-10 m-10 border-2 flex-grow rounded-md">
                {title && (
                    <h1 className="text-center text-xl border-b p-2 w-3/6 mx-auto border-yellow-red-900">
                        {title}
                    </h1>
                )}

                <List
                    listItems={itemsCtx.items}
                    remove={removeItemHandler}
                    changed={itemsCtx.updateItem}
                    blur={itemsCtx.updateItem}
                />

                {itemsCtx.items.length > 0 && (
                    <div className="mx-auto w-full text-center m-6">
                        <Button title="Create List" click={submitFormHandler} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateList;
