import { PropsWithChildren } from 'react';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';

type PageLayoutProps = {
  pageClassName?: string;
  mainClassName?: string;
  showHeaderNavigation?: boolean;
  showFooter?: boolean;
};

export function PageLayout({
  children,
  pageClassName = 'page',
  mainClassName = 'page__main',
  showHeaderNavigation = true,
  showFooter = false,
}: PropsWithChildren<PageLayoutProps>): JSX.Element {
  return (
    <div className={pageClassName}>
      <Header showNavigation={showHeaderNavigation} />

      <main className={mainClassName}>
        {children}
      </main>

      {showFooter && <Footer />}
    </div>
  );
}
