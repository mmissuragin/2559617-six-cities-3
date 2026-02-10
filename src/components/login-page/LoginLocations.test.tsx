import { render, screen, fireEvent } from '@testing-library/react';
import { LoginLocations } from './LoginLocations';
import { changeCity } from '../../store/action';
import { vi } from 'vitest';

const mockDispatch = vi.fn();
const mockNavigate = vi.fn();

vi.mock('react-redux', () => {
  const actual = require('react-redux') as typeof import('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: (selector: any) =>
      selector({ city: 'Paris' }),
  };
});

vi.mock('react-router-dom', () => {
  const actual = require('react-router-dom') as typeof import('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../../store/action', () => ({
  changeCity: vi.fn((city: string) => ({ type: 'CHANGE_CITY', payload: city })),
}));

describe('LoginLocations', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockNavigate.mockClear();
  });

  it('renders a random city link different from current city', () => {
    render(<LoginLocations />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).not.toHaveTextContent('Paris');
  });

  it('dispatches changeCity and navigates when link is clicked', () => {
    render(<LoginLocations />);
    const link = screen.getByRole('link');
    fireEvent.click(link);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(changeCity).toHaveBeenCalledWith(expect.any(String));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
