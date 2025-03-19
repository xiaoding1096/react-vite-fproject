const TodoAdd = (props) => {
    const {addNewTodo} = props;
    // addNewTodo("The Money");
    const handleClick = () => {
        alert("click me");
    }

    const handleOnChange = (name) => {
        console.log(name);
    }
    return (
        <div className="todo-add">
            <input type="text" onChange = {(event) => {handleOnChange(event.target.value)}}/>
            <button type="button" onClick={handleClick}>Add</button>
        </div>
    )
}
 
export default TodoAdd;