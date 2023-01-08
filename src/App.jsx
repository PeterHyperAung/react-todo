import { createContext, useState } from 'react';
import EditTask from './components/EditTask';
import Home from './components/Home';
// import { pink } from '@mui/material/colors';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';

// if the value doesn't change you can simply set it here
export const CountContext = createContext();

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
        <CountContext.Provider value={items.length}>
            <Box>
                <Header clear={clear}></Header>
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
        </CountContext.Provider>
    );
}

export default App;
