import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import { CountContext } from '../App';

const Title = () => {
    const count = useContext(CountContext);
    return (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo App ({count})
        </Typography>
    );
};

export default Title;
