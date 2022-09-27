import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import { Switch, Thumb } from './stitches';

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();


  useEffect(() => {
    setMounted(true);
  }, [])

  if (!mounted) return null;

  return (
    <Switch 
      onCheckedChange={() => setTheme(theme === 'light' ? 'dark' : 'light') }
      defaultChecked={theme === 'dark'}
    >
      <Thumb />
    </Switch>
  );
}

export default ThemeToggle;