import "./components/todo/todo.css";
import TodoAdd from "./components/todo/TodoAdd";
import TodoData from "./components/todo/TodoData";
import reactLogo from "./assets/react.svg";



const App = () => {
  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoAdd />
      <TodoData/>
      <div className="todo-image">
        <img src={reactLogo} className="logo"/>
      </div>
    </div>
  )
}

export default App
