import { createContext, useContext, useState } from "react";

type ContextType = {
    toggleTheme: () => void,
    theme: ThemeType | undefined
}

type ThemeType = 'light' | 'dark';

const ThemeContext = createContext<ContextType>({} as ContextType);

export const useTheme = () => useContext(ThemeContext);

interface ComponentProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ComponentProps> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeType>('light');

    const toggleTheme = () => {
        return setTheme((prevState) => prevState === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
