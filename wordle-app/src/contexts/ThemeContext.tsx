import React, { createContext, useState, ReactNode } from 'react';

export const ThemeContext = createContext<{
    darkMode: boolean;
    toggleDarkMode: () => void
}>({
    darkMode: false,
    toggleDarkMode: () => { }
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};


