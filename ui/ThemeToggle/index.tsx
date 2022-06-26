import { useTheme } from 'next-themes';
import { Switch, Thumb } from './stitches'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () =>
    setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <Switch 
      onCheckedChange={() => toggleTheme() }
      defaultChecked={theme === 'dark'}
    >
        <Thumb />
    </Switch>
  );
}

export default ThemeToggle;