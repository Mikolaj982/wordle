import { SetStateAction } from 'react';
import '../GameInfo/GameInfo.scss';

export const GameInfo: React.FC<{ setGameInfo: React.Dispatch<SetStateAction<boolean>> }> = ({ setGameInfo }) => {
    return (
        <div>
            <div className="gameInfoContainer">
                <button onClick={() => setGameInfo(false)}>X</button>
                <p>Odgadnij losowe hasło! </p>
                <p>Wpisz dowolne 5-literowe hasło i naciśnij enter, by spróbować odgadnąć hasło.</p>
                <p>Po każdej próbie, litery zostaną odpowiednio zaznaczone:</p>
                <div className='exampleWord'>
                    <div>s</div>
                    <div>ł</div>
                    <div>o</div>
                    <div>w</div>
                    <div>o</div>
                </div>
                <p>Jeśli litera podświetlona jest na zielono, występuje ona w haśle w tym samym miejscu</p>
                <div className='exampleWord'>
                    <div>k</div>
                    <div>w</div>
                    <div>i</div>
                    <div>a</div>
                    <div>t</div>
                </div>
                <p>Jeśli litera podświetlona jest na żółto, występuje ona w haśle, lecz w innym miejscu</p>
                <div className='exampleWord'>
                    <div>s</div>
                    <div>z</div>
                    <div>a</div>
                    <div>f</div>
                    <div>a</div>
                </div>
                <p>Jeśli litera nie jest podświetlona, nie występuje w haśle</p>
                <p>Na stronie dostępne są hasła pobrane ze storny sjp.pl, w różych formach. Na odgadnięcie masz 5 prób, powodzenia!</p>
                <p>Inspirowane grą Wordle oraz Literalnie. Aplikacja została stworzona wyłącznie w celach edukacyjnych i demonstracyjnych.</p>
            </div>
        </div>
    )
}