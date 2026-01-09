import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/api-actions';
import { AppDispatch } from '../../store/store';

export function LoginForm(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!email.trim() || !password.trim()) {
      return;
    }

    dispatch(login({ email, password }));
  };

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form className="login__form form" onSubmit={handleSubmit}>
        <div className="login__input-wrapper form__input-wrapper">
          <input
            className="login__input form__input"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </div>
        <div className="login__input-wrapper form__input-wrapper">
          <input
            className="login__input form__input"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </div>
        <button className="login__submit form__submit button" type="submit">
          Sign in
        </button>
      </form>
    </section>
  );
}
