import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { ChangeEvent } from 'react';
import './GuessWord.css';
import { keyboardKey } from '@testing-library/user-event';

export const GuessWord: React.FC = (): JSX.Element => {
  const [guessWord, setGuessWord] = useState<string[]>(['', '', '', '', '']);
  const [isMatch, setIsMatch] = useState<boolean[]>([false, false, false, false, false]);
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const randomWord = 'randm';
  const randomArray = randomWord.split('');

  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
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

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const combinedInput = guessWord.join('');
      const combinedInputArray = combinedInput.split('');
      const updatedIsMatch = guessWord.map((letter, index) =>
        randomArray[index] === combinedInputArray[index]
      );
      setIsMatch(updatedIsMatch);

      combinedInputArray.forEach((item, index) => {
        if (randomArray.includes(item)) {
          const newGuessWord = [...guessWord];
          newGuessWord[index] = item;
          setGuessWord(newGuessWord);
        }
      });

      setIsDisabled(true);
    }
  };
  return (
    <div className='guessWord'>
      {guessWord.map((letter, index) => (
        <input
          key={index}
          ref={ref => (inputRefs.current[index] = ref)}
          type='text'
          className='letter'
          id={`${index}`}
          value={letter}
          onChange={event => handleInputChange(index, event)}
          onKeyUp={event => handleInputKeyUp(index, event)}
          onKeyDown={handleInputKeyPress}
          style={{
            background: isMatch[index] ? 'green' : 'gray',
            pointerEvents: isMatch[index] ? 'none' : 'auto',
          }}
          disabled={isDisabled}
          minLength={1}
          maxLength={1}
          required
        />
      ))}
    </div>
  )
}
