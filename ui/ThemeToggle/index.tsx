import { useTheme } from 'context/theme';
import { Switch, Thumb } from './stitches'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

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