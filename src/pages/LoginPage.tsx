import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoginForm } from '../components/login-page/LoginForm';
import { LoginLocations } from '../components/login-page/LoginLocations';
import { PageLayout } from '../components/page-layout/PageLayout';
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
        <LoginForm />
        <LoginLocations />
      </div>
    </PageLayout>
  );
}
