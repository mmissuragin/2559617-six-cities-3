import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppRoute } from '../../const';
import { RootState } from '../../store/store';

export function HeaderNavigation(): JSX.Element {
  const currentUser = useSelector((state: RootState) => state.currentUser);

  if (!currentUser) {
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
            <div
              className='header__avatar-wrapper user__avatar-wrapper'
              style={{ backgroundImage: `url(${currentUser.avatarUrl})` }}
            ></div>
            <span className='header__user-name user__name'>
              {currentUser.name}
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
