import cn from 'classnames';
import styles from './HeaderLink.module.css';

import { Children, isValidElement, cloneElement } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import useHover from '../../../hooks/useHover';

function HeaderLink({ children, to, active, ...props }) {
  const { isHover, onMouseEnter, onMouseLeave } = useHover();

  const type = !isHover && !active ? 'secondary' : 'primary';

  const linkClass = cn(styles.link, 'm-4', {
    text_color_inactive: !isHover && !active,
  });

  return (
    <Link
      to={to}
      className={linkClass}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
