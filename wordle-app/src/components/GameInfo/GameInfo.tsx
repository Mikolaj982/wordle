import { CSSProperties, ReactNode, SetStateAction } from 'react';
import '../GameInfo/GameInfo.scss';

export const GameInfo: React.FC<{ setGameInfo: React.Dispatch<SetStateAction<boolean>> }> = ({ setGameInfo }) => {

    const generateParagraph = (text: string) => {
        return <div>{text}</div>
    }

    const generateExample = (word: string, styles: CSSProperties, styleIndex: number): ReactNode => {
        return word.split('').map((letter, index) => {
            return <div style={index === styleIndex ? styles : {}} key={index}>{letter}</div>
        })
    }

    const title = "Odgadnij losowe hasło!";
    const instructions = "Wpisz dowolne 5-literowe hasło i naciśnij enter, by spróbować odgadnąć hasło.";
    const attempts = "Po każdej próbie, litery zostaną odpowiednio zaznaczone:";
    const exampleWordStyles: CSSProperties = {
        backgroundColor: 'rgb(35, 190, 35)',
    };

    const exampleWordStyles1: CSSProperties = {
        backgroundColor: '#ffa500',
    };

    const exampleWordStyles2: CSSProperties = {
        backgroundColor: 'rgb(58, 58, 60)',
    };

    return (
        <div>
            <div className="gameInfoContainer">
                <button onClick={() => setGameInfo(false)}>X</button>
                {generateParagraph(title)}
                {generateParagraph(instructions)}
                {generateParagraph(attempts)}
                <div className='exampleWord'>
                    {generateExample('słowo', exampleWordStyles, 3)}
                </div>
                {generateParagraph('Jeśli litera podświetlona jest na zielono, występuje ona w haśle w tym samym miejscu')}
                <div className='exampleWord'>
                    {generateExample('kwiat', exampleWordStyles1, 2)}
                </div>
                {generateParagraph('Jeśli litera podświetlona jest na żółto, występuje ona w haśle, lecz w innym miejscu')}
                <div className='exampleWord'>
                    {generateExample('szafa', exampleWordStyles2, 4)}
                </div>
                {generateParagraph('Jeśli litera nie jest podświetlona, nie występuje w haśle')}
                {generateParagraph('Na stronie dostępne są hasła pobrane ze storny sjp.pl, w różych formach. Na odgadnięcie masz 5 prób, powodzenia!')}
                {generateParagraph('Inspirowane grą Wordle oraz Literalnie. Aplikacja została stworzona wyłącznie w celach edukacyjnych i demonstracyjnych.')}
            </div>
        </div>
    )
}