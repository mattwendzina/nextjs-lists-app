import { useState } from 'react';

import Input from '../ui/Input/input';
import List from './List';

const CreateList = () => {
    const [title, setTitle] = useState();
    const [item, setItem] = useState();
    const [items, setItems] = useState([]);

    const onSubmitItem = (e) => {
        e.preventDefault();
        const newItem = { name: item, id: new Date() };
        setItems([...items, newItem]);
        setItem('');
    };

    return (
        <div className="flex">
            <div className="p-3">
                <Input
                    title="List name"
                    id="listName"
                    changed={(e) => setTitle(e.target.value)}
                />

                <form onSubmit={onSubmitItem}>
                    <Input
                        title="Item name"
                        id="listItem"
                        changed={(e) => setItem(e.target.value)}
                        value={item}
                    />
                    <button onSubmit={onSubmitItem}>Submit</button>
                </form>
            </div>
            <div className="px-10 m-10 border-2 flex-grow rounded-md">
                {title && (
                    <h1 className="text-center text-xl border-b p-2 w-3/6 mx-auto border-yellow-red-900">
                        {title}
                    </h1>
                )}
                <List listItems={items} />
            </div>
        </div>
    );
};

export default CreateList;