import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppRoute } from '../../const';
import { RootState, AppDispatch } from '../../store/store';
import { logout } from '../../store/api-actions';

export function HeaderNavigation(): JSX.Element {
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    await dispatch(logout());
    navigate(AppRoute.Login);
  };

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
          <a
            className='header__nav-link'
            href="#"
            onClick={handleLogout}
          >
            <span className='header__signout'>Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
