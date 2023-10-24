import React, { useEffect, useState, useCallback, useContext, SetStateAction } from 'react'
import './MainPage.scss';
import { RandomWord } from '../RandomWord/RandomWord';
import { WinOrLosePopUp } from '../WinPopUp/WinPopUp';
import { ErrorHandler } from '../ErrorHandler/ErrorHandler';
import { Keyboard } from '../Keyboard/Keyboard';
import { GameInfo } from '../GameInfo/GameInfo';
import { DarkModeToggle } from '../DarkModeToggle/DarkModeToggle';
import { ThemeContext } from '../../contexts/ThemeContext';
import { DarkModeContextType } from '../DarkModeToggle/DarkModeToggle';
import { UsedLetterProvider } from '../../contexts/UsedLettersContext';
import HelpIcon from '@mui/icons-material/Help';
import { usedLetters } from '../../contexts/UsedLettersContext';

export interface UsedLettersType {
  usedLetters: usedLetters,
  handleUsedLetters: (newArray: string[], guessWord: string[], randomWordArray: string[]) => void,
}

export const MainPage: React.FC = () => {
  const [sortedWords, setSortedWords] = useState<string[]>(['']);
  const [randomWord, setRandomWord] = useState<string>('');
  const [isWin, setIsWin] = useState<boolean | null>(null);
  const [isDataValid, setIsDataValid] = useState<boolean>(true);
  const [gameInfo, setGameInfo] = useState<boolean>(false);
  const inputValue: string[] = ['', '', '', '', ''];
  const { darkMode } = useContext<DarkModeContextType>(ThemeContext)

  useEffect(() => {
    fetchAndSortWords();
  }, []);

  const selectRandomWord = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * sortedWords.length);
    const randomWord = sortedWords[randomIndex];
    setRandomWord(randomWord);
  }, [sortedWords]);

  useEffect(() => {
    if (sortedWords.length > 0) {
      selectRandomWord();
    }
  }, [sortedWords, selectRandomWord]);

  const fetchAndSortWords = async () => {
    try {
      const response = await fetch('../words.txt');
      const data = await response.text();
      const wordsArray = data.split('\n').map(word => word.trim()).filter((word) => (word.length === 5 && !word.includes('q')));
      setSortedWords(wordsArray);
    } catch (error) {
      setIsDataValid(false);
    }
  }

  const handleWinInfo = (boolean: boolean): void => {
    setIsWin(boolean)
  }

  const handleGameInfo = (): void => {
    setGameInfo(true);
  }

  return (
    <>
      <div className='btnsContainer'>
        <HelpIcon
          className='helpIcon'
          id={darkMode ? 'helpIconDarkTheme' : ''}
          onClick={handleGameInfo}
        />
        <DarkModeToggle />
      </div>
      <h1 className={darkMode ? 'darkTheme' : ''}>Słownikowo</h1>
      <UsedLetterProvider>
        <div className='wordsContainer'>
          {gameInfo ? <GameInfo setGameInfo={setGameInfo} /> : ''}
          {isWin !== null && <WinOrLosePopUp msg={isWin ? 'WYGRAŁEŚ' : 'PRZEGRAŁEŚ'} isWin={isWin} word={randomWord} />}
          {isDataValid ? '' : <ErrorHandler msg={'Błąd podczas pobierania danych.'} />}
          <RandomWord
            handleWinInfo={handleWinInfo}
            word={randomWord}
            inputValue={inputValue}
          />
        </div>
        <Keyboard />
      </UsedLetterProvider>
    </>
  )
}
