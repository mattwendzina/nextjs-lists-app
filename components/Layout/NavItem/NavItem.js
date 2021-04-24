import PropTypes from 'prop-types';
import Link from 'next/link';

const NavItem = (props) => {
    const { classes, link, title, click } = props;

    return (
        <Link href={link}>
            <a onClick={click} className={classes}>
                {title}
            </a>
        </Link>
    );
};

export default NavItem;

NavItem.propTypes = {
    classes: PropTypes.string,
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    click: PropTypes.func,
};
