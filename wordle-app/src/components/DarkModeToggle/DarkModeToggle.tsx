import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import Slider from '@mui/material/Slider';
import '../DarkModeToggle/DarkModeToggle.scss';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';

export interface DarkModeContextType {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

export const DarkModeToggle = () => {
    const { darkMode, toggleDarkMode } = useContext<DarkModeContextType>(ThemeContext);

    return (
        <div className='sliderContainer' id={darkMode ? 'sliderContainerDarkTheme' : ''}>
            <NightlightRoundIcon className='moon' />
            <Slider
                id='slider'
                onClick={toggleDarkMode}
                value={darkMode ? 1 : 0}
                min={0}
                max={1}
                step={1}
            />
            <LightModeIcon className='sun' />
        </div>
    );
};
