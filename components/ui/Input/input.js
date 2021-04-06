const input = (props) => {
    const { title, changed, id, value } = props;

    return (
        <label htmlFor={id} className="block cursor-pointer">
            <span className="text-gray-700 text-sm">{title}</span>
            <input
                id={id}
                type="text"
                class="mx-auto form-input block mt-1 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-400 focus:ring-opacity-50"
                onChange={changed}
                value={value}
            />
        </label>
    );
};

export default input;
