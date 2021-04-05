const input = (props) => {
    const { title } = props;

    return (
        <label className="block">
            <span className="text-gray-700 text-sm">{title}</span>
            <input
                type="text"
                class="form-input block mt-1 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-400 focus:ring-opacity-50"
            />
        </label>
    );
};

export default input;
