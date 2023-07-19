import React from 'react'
import { Keyboard } from '../Keyboard/Keyboard'
import { GuessWord } from '../GuessWord/GuessWord'
import './MainPage.css';

export const MainPage: React.FC = (): JSX.Element => {
  return (
    <>
      <h1>Słownikowo</h1>
      <GuessWord />
      <Keyboard />
    </>
  )
}
