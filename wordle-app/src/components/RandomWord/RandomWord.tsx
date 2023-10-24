import React, { useState } from "react";
import { GuessWord } from "../GuessWord/GuessWord";

interface RandomWordProps {
    word: string,
    inputValue: string[],
    handleWinInfo: (boolean: boolean) => void,
}

export const RandomWord: React.FC<RandomWordProps> = ({
    word,
    inputValue,
    handleWinInfo,
}) => {
    const [focus, setFocus] = useState<number>(0);
    const [isDisable, setIsDisable] = useState<boolean>(false);
    console.log('wylosowane słowo to', word)
    return (<>
        {inputValue.map((inputValue, index: number) => {
            return <GuessWord
                key={index}
                randomWord={word}
                autoFocus={focus === index}
                setFocus={setFocus}
                isDisable={isDisable}
                setIsDisable={setIsDisable}
                handleWinInfo={handleWinInfo}
            />
        })}</>
    )
};