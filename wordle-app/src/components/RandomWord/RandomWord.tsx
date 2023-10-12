import React, { useState } from "react";
import { GuessWord } from "../GuessWord/GuessWord";

interface RandomWordProps {
    word: string,
    inputValue: string[],
    handleWinInfo: (boolean: boolean) => void,
    // setUsedLetters: (prevArray: string[]) => void,
}

export const RandomWord: React.FC<RandomWordProps> = ({
    word,
    inputValue,
    handleWinInfo,
    // setUsedLetters,
}) => {
    const [focus, setFocus] = useState<number>(0);
    const [isDisable, setIsDisable] = useState<boolean>(false);
    console.log('Wylosowane słowo to:', word);
    return (<>
        {inputValue.map((inputValue, index: number) => {
            return <GuessWord
                // key={index}
                randomWord={word.toString()}
                autoFocus={focus === index}
                setFocus={setFocus}
                isDisable={isDisable}
                setIsDisable={setIsDisable}
                handleWinInfo={handleWinInfo}
            // setUsedLetters={setUsedLetters}
            />
        })}</>
    )
};