import "./components/todo/todo.css";
import TodoAdd from "./components/todo/TodoAdd";
import TodoData from "./components/todo/TodoData";
import reactLogo from "./assets/react.svg";



const App = () => {
  const fullname = "nguyen dinh";
  const age = 26;
  const data = {
    address : "vietnam",
    zip : 123456,
  }

  const addNewTodo = (name) => {
    alert(`Show me ${name}`);
  }
  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoAdd addNewTodo = {addNewTodo}/>
      <TodoData name ={fullname} age = {age} data = {data}/>
      <div className="todo-image">
        <img src={reactLogo} className="logo"/>
      </div>
    </div>
  )
}

export default App
