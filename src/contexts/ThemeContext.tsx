import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getStorage, setStorage } from '../utils/util';

interface ThemeContextType {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        // Fetch the theme from localStorage when the component mounts
        getStorage<'light' | 'dark'>('theme')
            .then((savedTheme) => {
                if (savedTheme) {
                    setTheme(savedTheme);
                }
            })
            .catch((error) => {
                console.error('Error fetching theme:', error);
            });
    }, []);

    useEffect(() => {
        // Apply the theme class to the document
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    const handleSetTheme = (newTheme: 'light' | 'dark') => {
        setTheme(newTheme);
        setStorage('theme', newTheme).catch((error) => {
            console.error('Error saving theme:', error);
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
