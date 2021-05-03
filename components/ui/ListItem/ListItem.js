import { useState, useEffect, useContext } from 'react';
import ItemsContext from '../../../store/items-context';
import { FiDelete } from 'react-icons/fi';
import { IoCheckbox } from 'react-icons/io5';
import classes from './listItem.module.css';

const ListItem = ({
    title,
    id,
    changed,
    blur,
    submit,
    remove,
    checked,
    toggleChecked,
}) => {
    const itemsCtx = useContext(ItemsContext);
    const [edit, toggleEdit] = useState(false);
    const [localChecked, updateLocalChecked] = useState();

    useEffect(() => {
        // Make sure that local toggle status gets synced with changes from DB. Doing this for UX purposes - it means they
        // see it change instantly, otherwise, you get a slight lag as you wait for the response from the server.
        updateLocalChecked(checked);
        // Add ItemsCtx.error as a dependency so that checked status gets rolled back if it is toggled when there is an error
    }, [checked, itemsCtx.error]);

    const liClassNames = `${classes.listItem} relative group cursor-pointer mx-auto w-max flex justify-center items-center text-lg`;

    const inputClassNames = `${classes.input} text-center border-none p-0 text-lg`;

    const updateItem = (e, id) => {
        e.preventDefault();
        toggleEdit(false);
        const updatedItem = e.target[0].value;
        // This check is here because createList only uses this method to update the UI,
        // the actual list page uses this to submit a live update to the database. As a result
        // it passes a 'submit' prop down (as a boolean) to denote it should be submitted to
        // database to update.
        submit && submit(updatedItem, id);
    };

    // Bit of duplication, but is a way of ensuring that the UI is updated instantly, while DB gets updated
    const toggleItemChecked = (checked) => {
        updateLocalChecked(!checked);
        toggleChecked(checked, id);
    };

    return (
        <li className={liClassNames}>
            {!edit ? (
                <div>
                    <IoCheckbox
                        className={
                            localChecked
                                ? classes.icon1__checked
                                : classes.icon1__unChecked
                        }
                        onClick={() => {
                            toggleItemChecked(localChecked);
                        }}
                    />
                    <p
                        className={localChecked ? 'line-through  w-64' : 'w-64'}
                        onClick={() => toggleEdit(true)}
                    >
                        {title}
                    </p>
                    <FiDelete
                        className={classes.icon}
                        onClick={() => remove(id)}
                    />
                </div>
            ) : (
                <form onSubmit={(e) => updateItem(e, id)}>
                    <input
                        className={inputClassNames}
                        type="text"
                        value={title}
                        onChange={(e) => changed(e.target.value, id)}
                        onBlur={(e) => {
                            blur(e.target.value, id);
                            toggleEdit(false);
                        }}
                        autoFocus={true}
                    />
                </form>
            )}
        </li>
    );
};
export default ListItem;
