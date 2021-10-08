import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import userSelectors from '../../redux/selectors/userSelectors';

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const isAuth = useSelector(userSelectors.isAuth);

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
