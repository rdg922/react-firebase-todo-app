import React, { useState, useEffect } from 'react';
import './App.css';

//importing Components
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import Navbar from "./components/Navbar";
import NavItem from "./components/NavItem";
import DropdownMenu from "./components/DropdownMenu";

// Firebase imports
import * as firebase from "firebase";
import firebaseConfig from './firebase.config';
import { Nav } from 'react-bootstrap';

firebase.initializeApp(firebaseConfig);

function App() {


  // States
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);


  // Use Effect

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler()
    saveLocalTodos()
  }, [todos, status])

  // Functions
  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }

  // Save to Local
  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todosLocal = (JSON.parse(localStorage.getItem('todos')))
      setTodos(todosLocal)
    }
  }

  // Run ONCE when app starts
  // getLocalTodos()


  return (
    <div className="App">
      <Navbar>
        <NavItem icon={<i className="fab fa-github"></i>} />
        <NavItem icon={<i className="fas fa-cog"></i>}>
          <DropdownMenu />
        </NavItem>
      </Navbar>

      <header>
        <h1>Rohit's Todo List</h1>
      </header>
      <Form todos={todos} setTodos={setTodos} inputText={inputText} setInputText={setInputText} setStatus={setStatus} />
      <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos} />
    </div>
  );
}

export default App;
