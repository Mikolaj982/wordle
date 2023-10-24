import React, { createContext, useState, ReactNode } from 'react';

export interface usedLetters {
    unmatchedLetters: string[],
    outOfPlaceLetters: string[],
    matchedLetters: string[]
}

export const UsedLettersContext = createContext<{
    usedLetters: usedLetters;
    handleUsedLetters: (
        newArray: string[],
        guessWord: string[],
        randomWordArray: string[],
    ) => void,
}>({
    usedLetters: { matchedLetters: [], outOfPlaceLetters: [], unmatchedLetters: [] },
    handleUsedLetters: () => { },
});

export const UsedLetterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [usedLetters, setUsedLetters] = useState<usedLetters>({
        unmatchedLetters: [],
        outOfPlaceLetters: [],
        matchedLetters: []
    });

    const handleUsedLetters = (newArray: string[], randomWordArray: string[], guessWord: string[]): void => {
        setUsedLetters(prevState => ({
            ...prevState,
            unmatchedLetters: [
                ...prevState.unmatchedLetters,
                ...newArray.filter((letter) => !guessWord.includes(letter))
            ],
            matchedLetters: [
                ...prevState.matchedLetters,
                ...randomWordArray.filter((letter, index) => guessWord[index] === letter)
            ],
            outOfPlaceLetters: [
                ...prevState.outOfPlaceLetters,
                ...newArray.filter((letter) => guessWord.includes(letter) && randomWordArray.filter((letter, index) => guessWord[index] !== letter))
            ]
        }))
    }

    return (
        <UsedLettersContext.Provider value={{ usedLetters, handleUsedLetters }}>
            {children}
        </UsedLettersContext.Provider>
    )
}