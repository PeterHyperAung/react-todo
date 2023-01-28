import React, { useEffect, useState, useRef } from 'react';
import {
    OutlinedInput,
    InputAdornment,
    IconButton,
    Container,
    Button,
    Box,
} from '@mui/material';
import { green } from '@mui/material/colors';
import {
    ArrowBack as ArrowBackIcon,
    Save as SaveIcon,
} from '@mui/icons-material';
import { useNavigate, useParams, Link } from 'react-router-dom';
const api = "http://localhost:8000";

const EditTask = ({ update }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [subject, setSubject] = useState('');

    useEffect(() => {
        (async () => {
        const res = await fetch(`${api}/tasks/${id}`);
        const result = await res.json();
        setSubject(result.subject);
        })()
    }, [id]);

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box>
                <IconButton
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>
            </Box>

            <form
                action=""
                onSubmit={(e) => {
                    e.preventDefault();
                    update(id, subject);
                    return navigate('/');
                }}
            >
                <OutlinedInput
                    fullWidth
                    placeholder="List"
                    value={subject}
                    onChange={(e) => {
                        setSubject(e.target.value);
                    }}
                    sx={{ marginTop: '15px' }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton type="submit">
                                <SaveIcon sx={{ color: green[500] }} />
                            </IconButton>
                        </InputAdornment>
                    }
                ></OutlinedInput>
            </form>
        </Container>
    );
};

export default EditTask;
