const TodoAdd = (props) => {
    const {addNewTodo} = props;
    // addNewTodo("The Money");
    return (
        <div className="todo-add">
            <input type="text" />
            <button type="button">Add</button>
        </div>
    )
}
 
export default TodoAdd;