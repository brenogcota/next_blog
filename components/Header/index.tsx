import LocaleSwitch from 'components/LocaleSwitch';
import ThemeToggle from 'ui/ThemeToggle';

import { HeaderLayout, Logo } from './stitches';

const Header = () => {
  return (
    <HeaderLayout>
      <Logo><span>d</span>brno</Logo>
      <nav>
        <LocaleSwitch />
        <a className='nav-item' href='#snippets'>Snippets</a>
        <ThemeToggle />
      </nav>
    </HeaderLayout>
  );
}

export default Header;