import Spacer from 'ui/Spacer';

import { HeaderLayout, Logo } from './stitches';

const Header = () => {
  return (
    <HeaderLayout>
        <Spacer size="md" />
        <Logo><span>d</span>brno</Logo>
    </HeaderLayout>
  );
}

export default Header;