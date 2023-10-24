import { useCallback, useContext, useEffect, useState } from 'react';
import '../Keyboard/Keyboard.scss'
import { v4 as uuidv4 } from 'uuid';
import { ThemeContext } from '../../contexts/ThemeContext';
import { DarkModeContextType } from '../DarkModeToggle/DarkModeToggle';
import { UsedLettersType } from '../MainPage/MainPage';
import { UsedLettersContext } from '../../contexts/UsedLettersContext';

export const Keyboard = () => {
    const alphabet: string = 'aąbcćdeęfghijklłmnńoóprsśtuwyzźż';
    const { darkMode } = useContext<DarkModeContextType>(ThemeContext);
    const { usedLetters } = useContext<UsedLettersType>(UsedLettersContext);

    return (
        <div
            className='keyboard'
            id={darkMode ? 'keyboard' : ''}
        >
            {alphabet.split('').map((letter, index) => {
                return (
                    <div
                        style={
                            usedLetters.matchedLetters.includes(letter.toUpperCase()) ? { backgroundColor: '#23be23' }
                                : usedLetters.outOfPlaceLetters.includes(letter.toUpperCase()) ? { backgroundColor: 'orange' }
                                    : usedLetters.unmatchedLetters.includes(letter.toUpperCase()) ? { backgroundColor: '#4f4b4b' } : {}
                        }
                        className='key'
                        id={darkMode ? 'key' : ''}
                        key={uuidv4()}
                    >
                        {letter}
                    </div>
                )
            })}
        </div>
    )
}