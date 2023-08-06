import { useEffect } from "react";

import { AddTodo } from "./components/AddTodo";
import { TodoList } from "./components/TodoList";

import { useDispatch } from "react-redux";
import { fetchTodos } from "./store/todoSlice";


export function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    return (
        <div className="App">
            <h1>TODOS/REDUX</h1>

            <AddTodo />
            <TodoList />
        </div>
    )
}
