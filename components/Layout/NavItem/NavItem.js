import PropTypes from 'prop-types';
import Link from 'next/link';

const NavItem = (props) => {
    const { classes, link, title } = props;
    console.log(classes, link, title);
    return (
        <Link href={link}>
            <a className={classes}>{title}</a>
        </Link>
    );
};

export default NavItem;

NavItem.propTypes = {
    classes: PropTypes.string,
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};