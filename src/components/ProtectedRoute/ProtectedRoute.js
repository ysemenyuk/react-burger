import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import userSelectors from '../../redux/selectors/userSelectors';

function ProtectedRoute({ children, ...rest }) {
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
}

export default ProtectedRoute;
