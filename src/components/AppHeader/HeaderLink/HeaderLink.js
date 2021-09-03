import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './HeaderLink.module.css';

function HeaderLink({ children, href, active, ...props }) {
  const [hover, setHover] = React.useState(false);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  const type = !hover && !active ? 'secondary' : 'primary';

  const linkClass = cn(styles.link, 'm-4', {
    text_color_inactive: !hover && !active,
  });

  return (
    <a
      href={href}
      className={linkClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { type }) : child
      )}
    </a>
  );
}

HeaderLink.propTypes = {
  href: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default HeaderLink;
