const Button = (props) => {
    const { title } = props;
    return (
        <button className="bg-teal-500 rounded-md p-2 mt-2.5 text-white hover:text-yellow-red-900 transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-yellow-red-900 focus:ring-opacity-50">
            {title}
        </button>
    );
};

export default Button;
