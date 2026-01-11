import { Link } from 'react-router-dom';
import { PageLayout } from '../components/page-layout/PageLayout';

export function NotFoundPage() {
  return (
    <PageLayout>
      <p style={{ textAlign: 'center' }}>
        Такой страницы у нас нет, зато есть много классных отелей. Найти их можно{' '}
        <Link to="/">
          <span style={{ color: '#6e5192' }}>на главной странице</span>
        </Link>
      </p>
    </PageLayout>
  );
}
