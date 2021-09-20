import cn from 'classnames';
import styles from './HeaderLink.module.css';

import { useState, Children, isValidElement, cloneElement } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

function HeaderLink({ children, to, active, ...props }) {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  const type = !hover && !active ? 'secondary' : 'primary';

  const linkClass = cn(styles.link, 'm-4', {
    text_color_inactive: !hover && !active,
  });

  return (
    <Link
      to={to}
      className={linkClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {Children.map(children, (child) =>
        isValidElement(child) ? cloneElement(child, { type }) : child
      )}
    </Link>
  );
}

HeaderLink.propTypes = {
  to: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default HeaderLink;
