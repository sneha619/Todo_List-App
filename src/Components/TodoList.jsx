import {React, useEffect} from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";

const TodoList = () => {
  let getTodos = [];
  try{
    const storedTodos = localStorage.getItem('lists');
    getTodos = storedTodos ? JSON.parse(storedTodos) : [];
  }catch(error){
    console.error('Error parsing stored todos:', error);
  }
   
  const [todos, setTodos] = useState(getTodos);
  const [newTaskStatus, setNewTaskStatus] = useState(false);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  
  useEffect (() => {
        localStorage.setItem(
            'lists', 
            JSON.stringify(todos)
        );
    },[todos]);

  const [newTask, setnewTask] = useState(null); 

  const handleNewTaskChange = (e) => {
    setnewTask(e.target.value);
    if(isEditItem!==null){
      const updatedTodos = todos.map((todo) => {
        if(todo.id === isEditItem){
          return {...todo, title: e.target.value}
        }
        return todo;
      });
      setTodos(updatedTodos);
    }
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (!newTask) {
      alert('Please enter a task');
    }else if(newTask && !toggleSubmit){
      setTodos(
        todos.map((todo)=>{
          if(todo.id === isEditItem){
            return{...todo, title: newTask, isComplete : newTaskStatus}
          }
          return todo;
        })
      )
      setToggleSubmit(true);
      setIsEditItem(null);
      setNewTaskStatus(false);
      setnewTask("");
    }else {
      const inputAllTodos = { id: new Date().getTime().toString(), title: newTask, isComplete: newTaskStatus }
      setTodos([...todos, inputAllTodos]);
      setnewTask("");
      setNewTaskStatus(false);
    }
  };

  const handleCompletion = (e) => {
    console.log(e.target.dataset.id);
    const currentTodoIndex = e.target.dataset.id;
    const updatedTodoStatus = todos.map(todo => {
      if(todo.id === currentTodoIndex){
        return{
          ...todo, isComplete: e.target.checked
        };
      }
      return todo;
    });

    setTodos(updatedTodoStatus);
  };

  const handleNewTodoStatus = (e) => {
    setNewTaskStatus(e.target.value);
  };

  const handleDeletion = (index) => {
    const deleteItem = todos.filter((todo) => {
      return index !== todo.id
    });

    setTodos(deleteItem);
  };

  const handleEdit = (index) => {
    let newEditItem = todos.find((todo) => {
        return index === todo.id
    });
    if(!newEditItem){
      console.warn(`Task with id ${newEditItem.id} not found.`);
      return;
    }
    console.log(newEditItem.title);
    const updatedTodos = todos.map(todo => {
      if(todo.id==index){
        return { ...todo, title: newEditItem.title, isComplete: newEditItem.isComplete };
      }
      return todo;
    });
    
    setTodos(updatedTodos);
    setNewTaskStatus(newEditItem.isComplete);
    setIsEditItem(newEditItem.id);
    setToggleSubmit(false);
  };

  return (
    <div className="todo-wrapper">
      <h1 className="heading">ToDo List</h1>
      <div className="todo-form">
        {!todos.length ? "Please add your first task..." : null}
        <form>
          <input
            className="input-todo"
            type="text"
            placeholder="Enter new task..." 
            title="Enter your task here"
            value={isEditItem !== null ? todos.find(todo => todo.id ===isEditItem).title : newTask}
            onChange={handleNewTaskChange}
          />
          {
            toggleSubmit ? 
            <button title="Add Task" onClick={handleTaskSubmit}><FontAwesomeIcon icon={faPlus} /></button> : 
            <button onClick={handleTaskSubmit}><FontAwesomeIcon icon={faPenToSquare} /></button>
          }
          <select onChange={handleNewTodoStatus} value={newTaskStatus}>
            <option value={false}>To be completed</option>
            <option value={true}>Completed</option>
          </select>
        </form>
      </div>
      <div className="todo-list">
        {todos.map((todo) => (
          <div className="todo-item" key={todo.id}>
            <input
              className="input-checkbox"
              type="checkbox"
              data-id={todo.id}
              checked={todo.isComplete}
              onChange={handleCompletion}
            />
            <div className="todo-content"> 
              <span className={todo.isComplete ? "completed" : ""}>
                {todo.title}
              </span>
            </div>
            <div className="todo-actions">
              <button title= "Edit task" onClick={() => handleEdit(todo.id)} className="edit-icon">
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <button title="Delete task" onClick={() => handleDeletion(todo.id)} className="delete-icon">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
