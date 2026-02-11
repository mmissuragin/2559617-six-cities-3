import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthorizationForm } from '../components/authorization-form/authorization-form';
import { LoginOffersRedirect } from '../components/login-offers-redirect/login-offers-redirect';
import { PageLayout } from '../components/page-layout/page-layout';
import { AppRoute } from '../const';
import { RootState } from '../store/store';

export function LoginPage(): JSX.Element {
  const currentUser = useSelector((state: RootState) => state.currentUser);

  if (currentUser) {
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <PageLayout
      pageClassName="page page--gray page--login"
      mainClassName="page__main page__main--login"
      showHeaderNavigation={false}
    >
      <div className="page__login-container container">
        <AuthorizationForm />
        <LoginOffersRedirect />
      </div>
    </PageLayout>
  );
}
