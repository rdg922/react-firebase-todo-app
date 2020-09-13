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

firebase.initializeApp(firebaseConfig);

const isSessionSignedIn = localStorage.getItem('signedIn') ? true : false;




function App() {


  // States
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [signedIn, setSignedIn] = useState(isSessionSignedIn);




  //   setSignedIn(isSessionSignedIn);
  // } else {
  //   setSignedIn(false); 
  // }

  // Use Effect

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler()
    saveLocalTodos()
  }, [todos, status])

  // useEffect(() => {
  //   localStorage.setItem('signedIn', signedIn)
  // }, [signedIn])

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

  // Firebase login
  const provider = new firebase.auth.GoogleAuthProvider();

  const SignIn = () => firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function () {

      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // Set state
        setSignedIn(true)
        localStorage.setItem('signedIn', true)
        // console.log("Signed in user " + user.email);

      })
    })


  const SignOut = () => firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function () {
      firebase.auth().signOut().then(function () {
        // Sign-out successful.
        setSignedIn(false);
        localStorage.setItem('signedIn', false)
      }).catch(function (error) {
        // An error happened.
      });
    })



  return (
    <div className="App">
      <Navbar>
        <NavItem icon={<i className="fas fa-cog"></i>}>
          <DropdownMenu SignIn={SignIn} SignOut={SignOut} signedIn={signedIn} />
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
