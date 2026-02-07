import { HeaderLogo } from './HeaderLogo';
import { HeaderNavigation } from './HeaderNavigation';

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
