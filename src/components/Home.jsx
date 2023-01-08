import { Container, Box, Divider } from '@mui/material';
import NewTask from './NewTask';
import TaskList from './TaskList';

const Home = ({ items, add, remove, edit, toggle }) => (
    <Container
    // maxWidth='sm'
    >
        <NewTask add={add} />

        <Box
            sx={{
                // px: { lg: '200px', md: '30px', sm: '5px' },
                mt: 4,
            }}
        >
            <TaskList
                items={items.filter((item) => !item.done)}
                remove={remove}
                edit={edit}
                toggle={toggle}
            />
            <Divider />
            <TaskList
                items={items.filter((item) => item.done)}
                remove={remove}
                edit={edit}
                toggle={toggle}
            />
        </Box>
    </Container>
);

export default Home;
