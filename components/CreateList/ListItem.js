import { useState, useContext } from 'react';
import { FiDelete } from 'react-icons/fi';
import classes from './listItem.module.css';

import ItemsContext from '../../store/items-context';

const ListItem = ({ title, removeItem, id }) => {
    const [updateItem, toggleUpdateItem] = useState(false);
    const itemsCtx = useContext(ItemsContext);

    const liClassNames = `${classes.listItem} relative group cursor-pointer mx-auto w-max flex justify-center items-center`;

    const inputClassNames = `${classes.input} text-center focus:shadow-none border-none focus:outline-none b`;

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
                <div>
                    <p onClick={() => toggleUpdateItem(true)}>{title}</p>
                    <FiDelete
                        className={classes.icon}
                        onClick={() => removeItem(id)}
                    />
                </div>
            ) : (
                <form onSubmit={editItem}>
                    <input
                        className={inputClassNames}
                        type="text"
                        value={title}
                        onChange={(e) => {
                            'onchange';
                            updateText(e.target.value);
                        }}
                        onBlur={(e) => {
                            updateText(e.target.value);
                            toggleUpdateItem(false);
                        }}
                        autoFocus={true}
                    />
                </form>
            )}
        </li>
    );
};
export default ListItem;
