import { useContext } from 'react';
import { MainPage } from './components/MainPage/MainPage';
import './App.scss';
import { ThemeContext } from './components/useContext/ThemeContext';
import { ContextType } from './components/DarkModeToggle/DarkModeToggle';

export const App = () => {
  const { darkMode } = useContext<ContextType>(ThemeContext);

  return (
    <div className="App" id={darkMode ? 'darkMode' : ''}>
      <MainPage />
    </div>
  );
}

