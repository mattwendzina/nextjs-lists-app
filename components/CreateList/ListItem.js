import { useState, useEffect } from 'react';
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
    const [edit, toggleEdit] = useState(false);
    const [localChecked, updateLocalChecked] = useState();

    useEffect(() => {
        // Make sure that local toggle status gets synced with changes from DB
        updateLocalChecked(checked);
    }, [checked]);

    const liClassNames = `${classes.listItem} relative group cursor-pointer mx-auto w-max flex justify-center items-center text-lg`;

    const inputClassNames = `${classes.input} text-center focus:shadow-none border-none focus:outline-none b text-lg`;

    const updateItem = (e, id) => {
        e.preventDefault();
        toggleEdit(false);
        const updatedItem = e.target[0].value;
        // This check is here because createList only uses this method to update the UI,
        // the actual list page uses this to submit a live update to the database.
        submit && submit(updatedItem, id);
    };

    // Bit of duplication, but is a way of ensuring that the UI is updated instantly, while DB gets updated
    const toggleLocalChecked = (checked) => {
        updateLocalChecked(!checked);
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
                            toggleChecked(checked, id);
                            toggleLocalChecked(checked);
                        }}
                    />
                    <p
                        className={localChecked ? 'line-through' : null}
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
