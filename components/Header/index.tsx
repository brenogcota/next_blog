import ThemeToggle from 'ui/ThemeToggle';

import { HeaderLayout, Logo } from './stitches';

const Header = () => {
  return (
    <HeaderLayout>
      <Logo><span>d</span>brno</Logo>
      <nav>
        <a className='nav-item' href='#me'>Me</a>
        <a className='nav-item' href='#snippets'>Snippets</a>
        <ThemeToggle />
      </nav>
    </HeaderLayout>
  );
}

export default Header;