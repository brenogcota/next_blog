import Spacer from 'ui/Spacer';
import ThemeToggle from 'ui/ThemeToggle';

import { HeaderLayout, Logo } from './stitches';

const Header = () => {
  return (
    <HeaderLayout>
      <Logo><span>d</span>brno</Logo>
      <nav>
        <a className='nav-item'>Me</a>
        <a className='nav-item'>Snippets</a>
        <ThemeToggle />
      </nav>
    </HeaderLayout>
  );
}

export default Header;