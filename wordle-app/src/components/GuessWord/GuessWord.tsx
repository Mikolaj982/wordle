import React from 'react'
import { useState } from 'react';
import './GuessWord.css';

export const GuessWord: React.FC = (): JSX.Element => {
  const [guessWord, setGuessWord] = useState<string[]>([...Array(5)]);
  return (
    <div className='guessWord'>
      {guessWord.map(
        (letter: string, index: number): JSX.Element => {
          return <>
            <input
              className='letter'>
            </input>
          </>
        })}
    </div>
  )
}
