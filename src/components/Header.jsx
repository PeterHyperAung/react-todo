import React from 'react';
import { Box, AppBar, Toolbar, Button } from '@mui/material';
import Title from './Title';
const Header = ({ clear }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'mainBg' }}>
                <Toolbar>
                    <Title />
                    <Button color="inherit" onClick={clear}>
                        Clear
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
