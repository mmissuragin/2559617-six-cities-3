import { HeaderLogo } from './header-logo';
import { HeaderNavigation } from './header-navigation';

type Props = {
  showNavigation?: boolean;
};

export function Header({ showNavigation = true }: Props): JSX.Element {
  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <HeaderLogo />
          </div>
          {showNavigation && <HeaderNavigation />}
        </div>
      </div>
    </header>
  );
}
