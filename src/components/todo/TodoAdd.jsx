import { useState } from "react";

const TodoAdd = (props) => {
    const {addNewTodo} = props;
    

    const [valueInput, setValueInput] = useState("Eric");
    const handleClick = () => {
        addNewTodo(valueInput);
        setValueInput("");
    }

    const handleOnChange = (name) => {
        setValueInput(name);
    }
    return (
        <div className="todo-add">
            <input type="text" onChange = {(event) => {handleOnChange(event.target.value)}}
            value= {valueInput}/>
            <button type="button" onClick={handleClick}>Add</button>
            <div> This Is state {valueInput}</div>
        </div>
        
    )
}
 
export default TodoAdd;