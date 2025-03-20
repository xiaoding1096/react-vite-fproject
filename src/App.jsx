import "./components/todo/todo.css";
import TodoAdd from "./components/todo/TodoAdd";
import TodoData from "./components/todo/TodoData";
import reactLogo from "./assets/react.svg";
import {useState} from "react";


const App = () => {
  const fullname = "nguyen dinh";
  const age = 26;
  const data = {
    address : "vietnam",
    zip : 123456,
  }
  const [todoList, setTodoList] = useState([
    {id: 1, name: "Learning React"},
    {id: 2, name: "Watching Youtube"}
  ])
  const addNewTodo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(1,1000000),
      name: name
    }
    setTodoList([...todoList, newTodo]);
  }
  const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoAdd addNewTodo = {addNewTodo}/>
      <TodoData 
      name = {fullname} 
      age = {age} 
      data = {data} 
      todoList = {todoList}
      />
      <div className="todo-image">
        <img src={reactLogo} className="logo"/>
      </div>
    </div>
  )
}

export default App
