import React from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    Button,
    useTheme,
    IconButton,
} from '@mui/material';
import {
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon,
} from '@mui/icons-material';
import Title from './Title';
const Header = ({ clear, changeTheme }) => {
    const theme = useTheme();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'mainBg' }}>
                <Toolbar>
                    <Title />
                    <Box>
                        {theme.palette.mode === 'dark' ? (
                            <IconButton onClick={changeTheme}>
                                <LightModeIcon></LightModeIcon>
                            </IconButton>
                        ) : (
                            <IconButton onClick={changeTheme}>
                                <DarkModeIcon></DarkModeIcon>
                            </IconButton>
                        )}
                        <Button color="inherit" onClick={clear}>
                            Clear
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
