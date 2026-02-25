import Playing from 'components/Playing';
import useMobileDetect from 'hooks/useDeviceDetector';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Text from 'ui/Text';
import ThemeToggle from 'ui/ThemeToggle';

const LocaleSwitch = dynamic(
  () => {
    return import('components/LocaleSwitch')
  },
  { ssr: false }
)

import { HeaderLayout, Logo } from './stitches';

const Header = () => {
  const { locale } = useRouter()
  const { isMobile } = useMobileDetect()

  return (
    <HeaderLayout>
      <Logo href={`/${locale}`}><span>d</span>brno</Logo>
      <nav>
        <Link href='/listening'>
          <a style={{ display: 'flex', alignItems: 'center', marginRight: '15px', cursor: 'pointer' }}>
            <Playing onlyIcon={isMobile()} />
          </a>
        </Link>
        <LocaleSwitch />
        <Link
          href='/blog'
        >
          <Text 
            size="md"
            css={{
              color: '$primary',
              fontWeight: '$lg',
              marginRight: '$4',
              cursor: 'pointer'
            }}
          >
            Blog
          </Text>
        </Link>
        <ThemeToggle />
      </nav>
    </HeaderLayout>
  );
}

export default Header;