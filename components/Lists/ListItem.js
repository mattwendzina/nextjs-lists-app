import { useState, useContext } from 'react';
import { FiDelete } from 'react-icons/fi';
import classes from './listItem.module.css';

import ItemsContext from '../../store/items-context';
import input from '../ui/Input/input';

const ListItem = ({ title, removeItem, id }) => {
    const [updateItem, toggleUpdateItem] = useState(false);
    const itemsCtx = useContext(ItemsContext);

    const liClassNames = `${classes.listItem} relative group cursor-pointer mx-auto w-max flex justify-center items-center`;

    const editItem = (e) => {
        e.preventDefault();
        toggleUpdateItem(false);
    };

    const updateText = (value) => {
        itemsCtx.updateItem(value, id);
    };

    return (
        <li className={liClassNames}>
            {!updateItem ? (
                <p onClick={() => toggleUpdateItem(true)}>{title}</p>
            ) : (
                <form onSubmit={editItem}>
                    <input
                        value={title}
                        onChange={(e) => updateText(e.target.value)}
                    />
                    <button>Update</button>
                </form>
            )}
            <FiDelete className={classes.icon} onClick={() => removeItem(id)} />
        </li>
    );
};
export default ListItem;
