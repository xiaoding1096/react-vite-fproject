import { useState } from "react";

const TodoAdd = (props) => {
    const {addNewTodo} = props;
    // addNewTodo("The Money");

    const [valueInput, setValueInput] = useState("eric")
    const handleClick = () => {
        console.log("check valueInput:", valueInput);
    }

    const handleOnChange = (name) => {
        setValueInput(name);
    }
    return (
        <div className="todo-add">
            <input type="text" onChange = {(event) => {handleOnChange(event.target.value)}}/>
            <button type="button" onClick={handleClick}>Add</button>
            <div> This Is state {valueInput}</div>
        </div>
        
    )
}
 
export default TodoAdd;