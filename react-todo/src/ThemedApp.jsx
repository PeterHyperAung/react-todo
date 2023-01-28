import { createContext, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

export const ModeContext = createContext();

const ThemedApp = ({ children }) => {
    const [mode, setMode] = useState('dark');

    const theme = createTheme({
        palette: {
            mode,
            ...(mode === 'dark'
                ? {
                      text: {
                          fade: '#999',
                          base: '#fff',
                      },
                  }
                : {
                      text: {
                          fade: '#888',
                          base: '#000',
                      },
                  }),
            mainBg: '#068488',
        },
    });

    const toggleMode = () => {
        setMode(mode === 'dark' ? 'light' : 'dark');
    };

    return (
        <ModeContext.Provider value={toggleMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ModeContext.Provider>
    );
};

export default ThemedApp;
