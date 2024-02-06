import React, { useState, useEffect, useRef, useContext } from 'react';
import '../GuessWord/GuessWord.scss';
import { ThemeContext } from '../../contexts/ThemeContext';
import { DarkModeContextType } from '../DarkModeToggle/DarkModeToggle';
import { UsedLettersType } from '../MainPage/MainPage';
import { UsedLettersContext } from '../../contexts/UsedLettersContext';

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
  const { handleUsedLetters } = useContext<UsedLettersType>(UsedLettersContext);

  // console.log('inputRefs:', inputRefs);
  // console.log('inputRefs.current.length:',inputRefs.current.length);
  // console.log('color:',color);
  console.log('attemptCounter:', attemptCounter);
  console.log('randomWord:', randomArray)

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

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toUpperCase();
    if (value.length > 0) {
      const newGuessWord = [...guessWord];
      newGuessWord[index] = value;
      setGuessWord(newGuessWord);
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }

    if (value.length === 0 && index >= 0) {
      const newGuessWord = [...guessWord];
      newGuessWord[index] = value;
      setGuessWord(newGuessWord);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleInputKeyUp = (index: number, event: React.KeyboardEvent<HTMLInputElement>): void => {
    //   if (event.key === 'Backspace' && index > 0 && event.currentTarget.value.length === 0) {
    //     event.preventDefault();
    //     inputRefs.current[index - 1]?.focus();
    //   } else if (event.key !== 'Backspace' && index < inputRefs.current.length - 1 && event.currentTarget.value.length = 0) {
    //     inputRefs.current[index + 1]?.focus();
    //   }
    // };
    const isBackspace = event.key === 'Backspace';
    const isEmpty = event.currentTarget.value.length === 0;
    if (isBackspace && index > 0 && isEmpty) {
      event.preventDefault();
      const prevInputRef = inputRefs.current[index - 1];
      prevInputRef?.focus();

    } else if (isBackspace && index > 0 && !isEmpty) {
      event.currentTarget.value = '';
      const prevInputRef = inputRefs.current[index - 1];
      prevInputRef?.focus();
      if (prevInputRef) {
        prevInputRef?.focus();
      }
    } else if (!isBackspace && index < inputRefs.current.length - 1 && !isEmpty) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setFocus(prev => prev + 1);
    setDisableOneLine(true);
    compareAndHighlightArrays();
    handleUsedLetters(separateUsedLetters, guessWord, randomArray);
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

    const isWin = updatedColor.every((color: string) => color === '#23be23');
    if (isWin) {
      const winColors = ['23be23', '23be23', '23be23', '23be23', '23be23'];
      setColor(winColors);
      setIsDisable(true);
      handleWinInfo(true);
    } else if (attemptCounter === 4) {
      handleWinInfo(false);
    }
    setColor(updatedColor);
  };

  return (
    <div className='guessWord'>
      <form onSubmit={(event: any) => handleInputKeyPress(event)}>
        {guessWord.map((letter, index) => (
          <input
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            type='text'
            className='letter'
            id={darkMode ? 'letter' : ''}
            value={letter}
            onChange={(event) => handleInputChange(index, event)}
            onKeyDown={(event) => {
              handleInputKeyUp(index, event);
              if (event.key === 'Enter') {
                event.preventDefault();
                handleInputKeyPress(event as any);
              }
            }
            }
            style={{ backgroundColor: color[index] }}
            disabled={isDisable || disableOneLine}
            minLength={1}
            maxLength={1}
            required
          />
        ))}
      </form>
    </div>
  );
};
