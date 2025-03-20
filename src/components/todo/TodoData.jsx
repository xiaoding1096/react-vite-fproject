const TodoData = (props) => {
    console.log(">> check props :", props);
    const {name, age, data, todoList} = props ;
    return (
        <div className="todo-data">
            {todoList.map((item,index) => {
                return (
                        <div className="todo-item">
                            <div>{item.name}</div>
                            <button>Delete</button>
                            
                        </div>
                )
            })}
            <div>My name is {name}</div>
            <div>I'm {age}</div>
            <div>This is my address {data.address} and this is my zipcode {data.zip}</div>
            <div>{JSON.stringify(props.todoList)}</div>
        </div>
    )
}

export default TodoData;