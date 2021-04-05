import PropTypes from 'prop-types';
import Link from 'next/link';

const LargeSelector = (props) => {
    const { link, title, test } = props;

    return (
        <div className="flex items-center justify-center text-5xl flex-1 hover:bg-teal-600 cursor-pointer duration-500 ease-in-out hover:text-yellow-red-900">
            <Link href={link}>{title}</Link>
        </div>
    );
};

LargeSelector.propTypes = {
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default LargeSelector;
