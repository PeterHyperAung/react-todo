import { Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    Check as CheckIcon,
    Undo as UndoIcon,
} from '@mui/icons-material';
import { pink, grey } from '@mui/material/colors';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Link } from 'react-router-dom';

const TaskList = ({ items, remove, toggle }) => {
    const [parent] = useAutoAnimate();

    return (
        <Box>
            <List ref={parent}>
                {items.map((item) => (
                    <ListItem
                        key={item._id}
                        style={{
                            color: item.done ? 'gray' : 'light',
                        }}
                        secondaryAction={
                            <Box>
                                <Link to={'/edit/' + item._id}>
                                    <IconButton edge="end" aria-label="edit">
                                        <EditIcon sx={{ color: grey[500] }} />
                                    </IconButton>
                                </Link>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => {
                                        remove(item._id);
                                    }}
                                >
                                    <DeleteIcon sx={{ color: pink[400] }} />
                                </IconButton>
                            </Box>
                        }
                    >
                        <IconButton onClick={() => toggle(item._id)}>
                            {item.done ? (
                                <UndoIcon />
                            ) : (
                                <CheckIcon sx={{ color: 'mainBg' }} />
                            )}
                        </IconButton>
                        &nbsp;
                        <ListItemText className="base">
                            {item.subject}
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TaskList;
