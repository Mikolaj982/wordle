import React from 'react';
import './Keyboard.css';

export const Keyboard: React.FC = (): JSX.Element => {
  const alphabet: string[] = 'aąbcćdeęfghijklłmnńoóprsśtuwyzźż'.split("");
  return (
    <div className='keyboard'>
      {alphabet.map(
        (letter: string, id: number) => {
          return <div
            className='key'
            id={letter}
            key={id}
          >
            {letter}
          </div>

        }
      )}</div>
  )
}
