import { useDispatch } from "react-redux";
import { completedTodo, deleteTodo } from "../store/todoSlice";


export function TodoItem({ id, title, completed }) {
    const dispatch = useDispatch();

    return (
        <div className={completed ? 'TodoItem active' : 'TodoItem'}>
            <span className={completed ? 'done' : ''}>{title}</span>

            <div className="icons">
                <i className="fa-solid fa-check" onClick={() => dispatch(completedTodo(id))}></i>
                <i className="fa-solid fa-trash" onClick={() => dispatch(deleteTodo(id))}></i>
            </div>
        </div>
    )
}

