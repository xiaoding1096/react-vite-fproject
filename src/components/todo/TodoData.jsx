const TodoData = (props) => {
    console.log(">> check props :", props);
    const {name, age, data} = props ;
    return (
        <div className="todo-data">
            <div>My name is {name}</div>
            <div>I'm {age}</div>
            <div>This is my address {data.address} and this is my zipcode {data.zip}</div>
            <div>Learning React</div>
            <div>Watching Youtube</div>
            <div>{JSON.stringify(props.todoList)}</div>
        </div>
    )
}

export default TodoData;