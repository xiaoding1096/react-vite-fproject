import { useState } from "react";

const TodoAdd = (props) => {
    const {addNewTodo} = props;
    

    const [valueInput, setValueInput] = useState("");
    const handleClick = () => {
        addNewTodo(valueInput);
        setValueInput("");
    }

   
    return (
        <div className="todo-add">
            <input type="text" onChange = {(event) => {setValueInput(event.target.value)}}
            value= {valueInput}/>
            <button type="button" onClick={handleClick}>Add</button>
        </div>
        
    )
}
 
export default TodoAdd;