import React, { createContext, useState, ReactNode } from 'react';

export const UsedLettersContext = createContext<{
    usedLetters: string[];
    handleUsedLetters: (newArray: string[]) => void,
}>({
    usedLetters: [],
    handleUsedLetters: () => { },
});

export const UsedLetterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [usedLetters, setUsedLetters] = useState<string[]>([]);

    const handleUsedLetters = (newArray: string[]): void => {
        setUsedLetters(prevArray => [...prevArray, ...newArray]);
    }

    return (
        <UsedLettersContext.Provider value={{ usedLetters, handleUsedLetters }}>
            {children}
        </UsedLettersContext.Provider>
    )
}