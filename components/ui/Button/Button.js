import PropTypes from 'prop-types';

const Button = (props) => {
    const { title, click, classes, type } = props;

    const initialClasses = [
        'bg-teal-500 rounded-md p-2 m-2 text-white hover:text-yellow-red-900 transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-yellow-red-900 focus:ring-opacity-50 shadow-lg',
    ];

    if (classes) {
        initialClasses.push(...classes);
    }

    const combinedClasses = initialClasses.join(' ');

    return (
        <button type={type} onClick={click} className={combinedClasses}>
            {title}
        </button>
    );
};

export default Button;

Button.propTypes = {
    title: PropTypes.string.isRequired,
    click: PropTypes.func,
    classes: PropTypes.array,
    type: PropTypes.string,
};
