import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import { RootState } from '../../store/store';

type PrivateRouteProps = {
  children: JSX.Element;
};

export function PrivateRoute({ children }: PrivateRouteProps) {
  const authorizationStatus = useSelector(
    (state: RootState) => state.authorizationStatus
  );

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return null;
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
