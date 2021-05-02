import moment from 'moment';

export const hasItemChanged = (list, value, id) => {
    const item = list.items
        .filter((item) => item.id === id)
        .map((item) => item.name);
    console.log('ITEM:', item);
    return item[0] === value ? false : true;
};

export const modifyItems = (selectedList, property, value, id) =>
    selectedList.items
        .map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    [property]: value,
                };
            }
            return item;
        })
        // If item has no value then assume user wanted to delete and filter it out
        .filter((item) => item.name !== '');

export const getDate = () => {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
};
