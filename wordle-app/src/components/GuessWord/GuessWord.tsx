import React, { useState, useEffect, useRef, ChangeEvent, useContext } from 'react';
import '../GuessWord/GuessWord.scss';
import { ThemeContext } from '../useContext/ThemeContext';
import { DarkModeContextType } from '../DarkModeToggle/DarkModeToggle';
import { UsedLettersType } from '../MainPage/MainPage';
import { UsedLettersContext } from '../useContext/UsedLettersContext';

interface GuessWordProps {
  randomWord: string,
  autoFocus: boolean,
  setFocus: React.Dispatch<React.SetStateAction<number>>,
  setIsDisable: React.Dispatch<React.SetStateAction<boolean>>,
  isDisable: boolean,
  handleWinInfo: (boolean: boolean) => void,
}

export const GuessWord: React.FC<GuessWordProps> = ({
  randomWord,
  autoFocus,
  setFocus,
  setIsDisable,
  isDisable,
  handleWinInfo,
}): JSX.Element => {
  const [guessWord, setGuessWord] = useState<string[]>(['', '', '', '', '']);
  const inputRefs = useRef<HTMLInputElement[] | null[]>([]);
  const randomArray = randomWord.split('');
  const [color, setColor] = useState<string[]>(['', '', '', '', '']);
  const [disableOneLine, setDisableOneLine] = useState<boolean>(false);
  const [attemptCounter, setAttemptCounter] = useState<number>(0);
  const coloredLetters = new Set();
  const separateUsedLetters = guessWord.filter((string, index) => guessWord.indexOf(string) === index);
  const { darkMode } = useContext<DarkModeContextType>(ThemeContext);
  const { handleUsedLetters } = useContext<UsedLettersType>(UsedLettersContext)

  useEffect(() => {
    if (autoFocus) {
      inputRefs.current[0]?.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setAttemptCounter((prev) => prev + 1);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [attemptCounter]);

  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.toUpperCase();
    const newGuessWord = [...guessWord];
    newGuessWord[index] = value;
    setGuessWord(newGuessWord);
  };

  const handleInputKeyUp = (index: number, event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Backspace' && index > 0 && event.currentTarget.value.length === 0) {
      event.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (event.key !== 'Backspace' && index < inputRefs.current.length - 1 && event.currentTarget.value.length > 0) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleInputKeyPress = (index: number, event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setFocus((prev: number) => prev + 1);
      setDisableOneLine(true);
      compareAndHighlightArrays();
      handleUsedLetters(separateUsedLetters);
    }
  };

  const compareAndHighlightArrays = () => {
    const updatedColor = guessWord.map((letter, index) => {
      let color = '';
      if (letter === randomArray[index]) {
        coloredLetters.add(letter);
        color = '#23be23';
      } else if (
        randomArray.some((item, rIndex) => item === letter && guessWord[rIndex] !== letter && !coloredLetters.has(`${letter}${rIndex}`))
      ) {
        const matchingIndices = randomArray.reduce((indices, item, rIndex) => {
          if (item === letter && !coloredLetters.has(`${letter}${rIndex}`)) {
            indices.push(rIndex);
          }
          return indices;
        }, [] as number[]);

        if (matchingIndices.length > 0) {
          const firstMatchingIndex = matchingIndices[0];
          coloredLetters.add(`${letter}${firstMatchingIndex}`);
          color = 'orange';
        }
      }
      return color;
    });

    const isWin = updatedColor.every((color: any) => color === '#23be23');
    if (isWin) {
      const winColors = ['23be23', '23be23', '23be23', '23be23', '23be23'];
      setColor(winColors);
      setIsDisable(true);
      console.log('wygrałeś!');
      handleWinInfo(true);
    } else if (attemptCounter === 4) {
      console.log('przegrałeś!')
      handleWinInfo(false);
    }
    setColor(updatedColor);
  };

  return (
    <div className='guessWord'>
      {guessWord.map((letter, index) => (
        <input
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          type='text'
          className='letter'
          id={darkMode ? 'letter' : ''}
          value={letter}
          onChange={(event) => handleInputChange(index, event)}
          onKeyUp={(event) => handleInputKeyUp(index, event)}
          onKeyDown={(event) => handleInputKeyPress(index, event)}
          style={{ backgroundColor: color[index] }}
          disabled={isDisable || disableOneLine}
          minLength={1}
          maxLength={1}
          required
        />
      ))}
    </div>
  );
};
