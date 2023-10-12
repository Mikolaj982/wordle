import React, { useContext } from 'react';
import '../Keyboard/Keyboard.scss'
import { v4 as uuidv4 } from 'uuid';
import { ThemeContext } from '../useContext/ThemeContext';
import { ContextType } from '../DarkModeToggle/DarkModeToggle';
import { UsedLettersType } from '../MainPage/MainPage';
import { UsedLettersContext } from '../useContext/UsedLettersContext';

export const Keyboard = () => {
    const alphabet: string = 'aąbcćdeęfghijklłmnńoóprsśtuwyzźż';
    const { darkMode } = useContext<ContextType>(ThemeContext);
    const { usedLetters } = useContext<UsedLettersType>(UsedLettersContext);
    return (
        <div
            className='keyboard'
            id={darkMode ? 'keyboard' : ''}
        >
            {alphabet.split('').map((letter) => {
                return (
                    <div
                        style={usedLetters.includes(letter.toUpperCase()) ? { backgroundColor: '#3a3a3c' } : {}}
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