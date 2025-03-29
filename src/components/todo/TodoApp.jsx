import "./todo.css";
import TodoAdd from "./TodoAdd";
import TodoData from "./TodoData";
import reactLogo from "../../assets/react.svg";
import {useState} from "react";

const TodoApp = () => {
    const [todoList, setTodoList] = useState([])
    const addNewTodo = (name) => {
      const newTodo = {
        id: randomIntFromInterval(1,1000000),
        name: name
      }
      setTodoList([...todoList, newTodo]);
    }
    
    const deleteTodo = (id) => {
      const newTodo = todoList.filter(item => item.id !== id);
      setTodoList(newTodo);
          }
  
    const randomIntFromInterval = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  
    return (
      <>
        <div className="todo-container">
          <div className="todo-title">Todo List</div>
          <TodoAdd addNewTodo = {addNewTodo}/>
          {todoList.length > 0 && 
          
          <TodoData
          todoList = {todoList}
          deleteTodo = {deleteTodo}
          />
          }
          {todoList.length === 0 && 
            <div className="todo-image">
              <img src={reactLogo} className="logo"/>
            </div>
          }
        </div>
      </>
    )
  }

  export default TodoApp;