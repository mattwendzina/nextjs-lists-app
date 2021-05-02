import { useState } from 'react';
import classes from './titleItem.module.css';

const TitleItem = ({ value, id, changed, blur, submit }) => {
    const [edit, toggleEdit] = useState(false);

    const liClassNames = `${classes.TitleItem} relative group cursor-pointer mx-auto flex justify-center items-center text-lg`;

    const inputClassNames = `${classes.input} text-center border-none text-lg`;

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

    return (
        <li className={liClassNames} onClick={() => toggleEdit(true)}>
            {!edit ? (
                <div>
                    <p>{value}</p>
                </div>
            ) : (
                <form onSubmit={(e) => updateItem(e, id)}>
                    <input
                        className={inputClassNames}
                        type="text"
                        value={value}
                        onChange={(e) => changed(() => e.target.value)}
                        onBlur={(e) => toggleEdit(false)}
                        autoFocus={true}
                    />
                </form>
            )}
        </li>
    );
};
export default TitleItem;
