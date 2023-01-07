import React, { useRef } from 'react';
import { IconButton, OutlinedInput, InputAdornment } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const NewTask = ({ add }) => {
    const input = useRef();

    return (
        <form
            action=""
            onSubmit={(e) => {
                e.preventDefault();
                const subject = input.current.value;
                if (!subject) return false;
                add(subject);
                input.current.value = '';
                input.current.focus();
            }}
        >
            <OutlinedInput
                fullWidth
                placeholder="List"
                sx={{ marginTop: '30px' }}
                inputRef={input}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() => {
                                let subject = input.current.value;
                                if (!subject) return false;
                                add(subject);
                                input.current.value = '';
                                input.current.focus();
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    </InputAdornment>
                }
            ></OutlinedInput>
        </form>
        // <TextField placeholder="Enter task" inputRef={input} />
        // <IconButton>
        //     <AddIcon />
        // </IconButton>+
    );
};

export default NewTask;
