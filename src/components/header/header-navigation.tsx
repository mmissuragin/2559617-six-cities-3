import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import { RootState } from '../../store/store';

export function HeaderNavigation(): JSX.Element {
  const authorizationStatus = useSelector(
    (state: RootState) => state.authorizationStatus
  );

  if (authorizationStatus === AuthorizationStatus.NoAuth) {
    return (
      <nav className='header__nav'>
        <ul className='header__nav-list'>
          <li className='header__nav-item'>
            <Link
              className='header__nav-link header__nav-link--profile'
              to={AppRoute.Login}
            >
              <span className='header__signout'>Sign in</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className='header__nav'>
      <ul className='header__nav-list'>
        <li className='header__nav-item user'>
          <a className='header__nav-link header__nav-link--profile' href="#">
            <div className='header__avatar-wrapper user__avatar-wrapper'></div>
            <span className='header__user-name user__name'>
              user@email.com
            </span>
            <span className='header__favorite-count'>0</span>
          </a>
        </li>
        <li className='header__nav-item'>
          <a className='header__nav-link' href="#">
            <span className='header__signout'>Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
