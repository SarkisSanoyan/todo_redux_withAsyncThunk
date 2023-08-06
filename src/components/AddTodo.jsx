import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTodo } from "../store/todoSlice";


export function AddTodo() {

    const [title, setTitle] = useState('');
    const dispatch = useDispatch();

    const submitHandler = e => {
        e.preventDefault();
        if (!title.trim()) return;
        dispatch(addNewTodo(title));
        setTitle('');
    }

    return (
        <form className="AddTodo" onSubmit={submitHandler}>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            <input type="submit" value="ADD NEW TODO" className="Add" />
        </form>
    )
}
