import React, { useState, useEffect } from 'react';
import './App.css';

//importing Components
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import Navbar from "./components/Navbar";
import NavItem from "./components/NavItem";
import DropdownMenu from "./components/DropdownMenu";

// Firebase imports
import firebase from "firebase";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

const isSessionSignedIn = localStorage.getItem('signedIn') ? true : false;

let userUid = null;
let databaseRef;
let databaseRefObject;


function App() {


  // States
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [signedIn, setSignedIn] = useState(isSessionSignedIn)

  const pushTodosFirebase = () => {
    if (signedIn) {
      databaseRef = firebase.database().ref(localStorage.getItem('signedIn'));
      databaseRef.set({ todos: JSON.stringify(todos), lastUpdated: Date.now() });
    }
  }

  const pullTodosFirebase = () => {
    if (signedIn) {
      databaseRef = firebase.database().ref(localStorage.getItem('signedIn'));
      databaseRef.child("todos")
        .once("value", (snap) => {
          setTodos(JSON.parse(snap.val()))
        })
    }
  }

  // Use Effect

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler()
    saveLocalTodos()
  }, [todos, status])

  useEffect(() => {
    pullTodosFirebase()
    // pushTodosFirebase()
  }, [signedIn])


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
    console.log("yuh")
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
        userUid = user.uid;
        localStorage.setItem('signedIn', user.uid);
      })
    })


  const SignOut = () => firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function () {
      firebase.auth().signOut().then(function () {
        // Sign-out successful.
        setSignedIn(false);
        localStorage.setItem('signedIn', false);
        userUid = null;
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
