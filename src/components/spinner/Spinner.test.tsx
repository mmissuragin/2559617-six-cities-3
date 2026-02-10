import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('should render loading text', () => {
    render(<Spinner />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
