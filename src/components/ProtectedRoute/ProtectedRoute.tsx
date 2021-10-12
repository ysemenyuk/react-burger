import { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useRedux';
import { userSelectors } from '../../redux/selectors';

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuth } = useAppSelector(userSelectors.userInfo);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
