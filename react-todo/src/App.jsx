import { createContext, useContext, useEffect, useState } from 'react';
import EditTask from './components/EditTask';
import Home from './components/Home';
// import { pink } from '@mui/material/colors';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { ModeContext } from './ThemedApp';

// if the value doesn't change you can simply set it here
export const CountContext = createContext();

function App() {
    const changeTheme = useContext(ModeContext);
    const [items, setItems] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:8000/tasks');
            const result = await res.json();
            setItems(result);
            console.log(result);
            // isLoading(false);
        })();
    }, []);


    const toggle = (id) => {
      fetch(`http://localhost:8000/tasks/${id}/toggle`, {
        method: "PUT"
      });

      setItems(items =>  items.map(item => {
        if(item._id === id) item.done = !item.done;
        return item;
      }))
    };

    const clear = () => {
       setItems(items => items.filter(item => !item.done));
       fetch('http://localhost:8000/tasks/', {
          method: 'DELETE'
       });
    };

    const update = (id, newData) => {
        setItems(items => {
            return items.map(item => {
                if(item._id === id) item.subject = newData;
                return item;
            })
        })
        fetch(`http://localhost:8000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subject: newData }),
        });
    };

    function add(subject) {
        (async () => {
            const res = await fetch('http://localhost:8000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subject }),
            });
            const task = await res.json();

            setItems((items) => [ ...items, task]);
        })();
    }

    function remove(id) {
        fetch(`http://localhost:8000/tasks/${id}`, {
            method: 'DELETE',
        });
        setItems(items.filter((item) => item._id !== id));
    }


    return (
        <CountContext.Provider value={items.length}>
            <Box>
                <Header clear={clear} changeTheme={changeTheme}></Header>
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
                        element={<EditTask update={update} />}
                    ></Route>
                </Routes>
            </Box>
        </CountContext.Provider>
    );
}

export default App;
