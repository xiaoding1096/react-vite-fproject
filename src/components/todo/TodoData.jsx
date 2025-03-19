const TodoData = (props) => {
    console.log(">> check props :", props);
    const {name, age} = props ;
    return (
        <div className="todo-data">
            <div>My name is {name}</div>
            <div>I'm {age}</div>
            <div>Learning React</div>
            <div>Watching Youtube</div>
        </div>
    )
}

export default TodoData;