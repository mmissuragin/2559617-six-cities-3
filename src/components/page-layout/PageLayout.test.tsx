import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PageLayout } from './PageLayout';

vi.mock('../header/Header', () => ({
  Header: ({ showNavigation }: { showNavigation?: boolean }) => <div data-testid="header">{showNavigation ? 'NavOn' : 'NavOff'}</div>
}));

vi.mock('../footer/Footer', () => ({
  Footer: () => <div data-testid="footer">Footer</div>
}));

describe('PageLayout', () => {
  it('renders children and default classes', () => {
    render(
      <PageLayout>
        <p>Test content</p>
      </PageLayout>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('page__main');
    expect(screen.getByTestId('header')).toHaveTextContent('NavOn');
    expect(screen.queryByTestId('footer')).toBeNull();
  });

  it('renders custom classes and Footer', () => {
    render(
      <PageLayout
        pageClassName="custom-page"
        mainClassName="custom-main"
        showFooter={true}
        showHeaderNavigation={false}
      >
        <span>Content</span>
      </PageLayout>
    );

    expect(screen.getByRole('main')).toHaveClass('custom-main');
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toHaveTextContent('NavOff');
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
