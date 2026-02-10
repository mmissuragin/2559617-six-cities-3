import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from './LoginForm';
import { login } from '../../store/api-actions';
import { vi } from 'vitest';

const mockDispatch = vi.fn();
vi.mock('react-redux', () => {
  const actual = require('react-redux') as typeof import('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

vi.mock('../../store/api-actions', () => ({
  login: vi.fn((payload) => ({ type: 'LOGIN', payload })),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('renders the form inputs and button', () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('dispatches login with correct credentials', () => {
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password1' } });
    fireEvent.click(submitButton);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password1',
    });
  });

  it('does not dispatch login if password is invalid', () => {
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'nopassword' } });
    fireEvent.click(submitButton);

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('does not dispatch login if fields are empty', () => {
    render(<LoginForm />);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.click(submitButton);

    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
