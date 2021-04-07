import { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Input from '../ui/Input/input';
import Button from '../ui/Button/Button';
import List from './List';
import ItemsContext from '../../store/items-context';

const CreateList = () => {
    const itemsCtx = useContext(ItemsContext);

    const [title, setTitle] = useState();
    const [item, setItem] = useState('');

    const onSubmitItem = (e) => {
        e.preventDefault();
        const newItem = { name: item, id: uuidv4() };
        itemsCtx.addItem(newItem);
        setItem('');
    };

    const removeItemHandler = (id) => itemsCtx.removeItem(id);

    return (
        <div className="md:flex">
            <div className="p-3">
                <div className="text-center">
                    <Input
                        title="List name"
                        id="listName"
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
                    removeItem={removeItemHandler}
                />
            </div>
        </div>
    );
};

export default CreateList;
