import React, { useContext } from 'react';
import '../WinPopUp/WinPopUp.scss'
import PlayAgain from '../ReloadPage/PlayAgain';
import { ThemeContext } from '../../contexts/ThemeContext';
import { DarkModeContextType } from '../DarkModeToggle/DarkModeToggle';

interface WinOrLosePopUpProps {
    msg: string,
    isWin: boolean,
    word: string
}

export const WinOrLosePopUp: React.FC<WinOrLosePopUpProps> = ({
    msg,
    isWin,
    word
}) => {
    const { darkMode } = useContext<DarkModeContextType>(ThemeContext)

    return (<>
        <div className='blurBackground' id={darkMode ? 'blurBackgroundDark' : ''}></div>
        <div className='winPopUp' style={isWin ? {} : { backgroundColor: '#e95d5d' }}>
            <h1>{msg}</h1>
            {isWin ? '' : <p>Ukryte słowo to {word}</p>}
            <PlayAgain />
        </div>
    </>
    )
}