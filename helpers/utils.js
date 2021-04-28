export const hasItemChanged = (list, value, id) => {
    const item = list.items
        .filter((item) => item.id === id)
        .map((item) => item.name);
    console.log('ITEM:', item);
    return item[0] === value ? false : true;
};

export const modifyList = (selectedList, property, value, id) =>
    selectedList.items.map((item) => {
        if (item.id === id) {
            return {
                ...item,
                [property]: value,
            };
        }
        return item;
    });
