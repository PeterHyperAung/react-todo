import { useState } from 'react';
import EditTask from './components/EditTask';
import Home from './components/Home';
import { pink } from '@mui/material/colors';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

function App() {
    const [items, setItems] = useState([
        { id: 1, subject: 'Egg', done: false },
        { id: 2, subject: 'Apple', done: false },
        { id: 3, subject: 'Bread', done: true },
    ]);

    const get = (id) => items.find((el) => el.id === parseInt(id));

    const toggle = (id) => {
        const result = items.map((item) => {
            if (item.id === id) item.done = !item.done;
            return item;
        });
        setItems(result);
    };

    const clear = () => {
        setItems(items.filter((item) => !item.done));
    };

    const update = (id, newData) => {
        if (!newData) return;
        const result = items.map((item) => {
            if (item.id === parseInt(id)) item.subject = newData;
            return item;
        });
        setItems(result);
    };

    function add(subject) {
        setItems([...items, { id: Date.now() + 1, subject, done: false }]);
    }

    function remove(id) {
        setItems(items.filter((item) => item.id !== id));
    }

    return (
        <Box>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: pink[500] }}>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            Todo App
                        </Typography>

                        <Button color="inherit" onClick={clear}>
                            Clear
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>

            <Routes>
                <Route
                    path=""
                    element={
                        <Home
                            items={items}
                            add={add}
                            remove={remove}
                            update={update}
                            toggle={toggle}
                        />
                    }
                ></Route>
                <Route
                    path="/edit/:id"
                    element={<EditTask get={get} update={update} />}
                ></Route>
            </Routes>
        </Box>
    );
}

export default App;
