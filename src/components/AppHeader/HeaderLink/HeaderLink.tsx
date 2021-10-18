import cn from 'classnames';
import styles from './HeaderLink.module.css';

import { Children, isValidElement, cloneElement, FC } from 'react';
import { Link } from 'react-router-dom';

import useHover from '../../../hooks/useHover';

type THeadeLinkProps = {
  to: string;
  active: boolean;
  last?: boolean;
};

const HeaderLink: FC<THeadeLinkProps> = ({ children, to, active, last, ...props }) => {
  const { isHover, onMouseEnter, onMouseLeave } = useHover();

  const type = !isHover && !active ? 'secondary' : 'primary';

  const linkClass = cn(
    styles.link,
    { text_color_inactive: !isHover && !active },
    { [styles.last]: last }
  );

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
};

export default HeaderLink;
