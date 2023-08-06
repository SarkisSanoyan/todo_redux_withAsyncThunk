import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function (_, { rejectWithValue }) {

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=15');
            if (!response.ok) throw new Error('Cant fetch data! Server Error!');
            const data = await response.json();
            return data;

        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async function (title, { rejectWithValue, dispatch }) {

        try {
            const newTodo = {
                userId: 1,
                title,
                completed: false
            };
            const response = await fetch('https://jsonplaceholder.typicode.com/todos', {    // axios.post('', newTodo);
                method: 'POST', // cankaliya metsatarov grel
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTodo)
            });
            if (!response.ok) throw new Error('Cant Add New Todo! Server Error!');
            const data = await response.json();
            dispatch(addTodo(data))
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function (id, { rejectWithValue, dispatch }) {

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/' + id, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Cant delete task! Server Error!');
            dispatch(removeTodo({ id }))
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const completedTodo = createAsyncThunk(
    'todos/completedTodo',
    async function (id, { rejectWithValue, dispatch, getState }) {
        const todo = getState().todos.todos.find(todo => todo.id === id);

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/' + id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed: !todo.completed })
            });
            if (!response.ok) throw new Error('Cant toggle todo status! Server Error!');
            dispatch(doneTodo({ id }));
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);


export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: null,
        error: null
    },
    reducers: {
        addTodo(state, action) {
            // console.log(action.payload);
            state.todos.push(action.payload)
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
        },
        doneTodo(state, action) {
            const todo = state.todos.find(todo => todo.id === action.payload.id);
            todo.completed = !todo.completed;
        }
    },
    extraReducers: {
        [fetchTodos.pending]: (state, action) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.todos = action.payload;
        },
        [fetchTodos.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
    }
})


const { addTodo, removeTodo, doneTodo } = todoSlice.actions

export default todoSlice.reducer


