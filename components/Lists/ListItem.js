import { FiDelete } from 'react-icons/fi';
import classes from './listItem.module.css';

const ListItem = ({ title, removeItem, id }) => {
    const liClassNames = `${classes.listItem} relative group cursor-pointer mx-auto w-max flex justify-center items-center`;

    return (
        <li className={liClassNames}>
            {title}
            <FiDelete className={classes.icon} onClick={() => removeItem(id)} />
        </li>
    );
};
export default ListItem;
