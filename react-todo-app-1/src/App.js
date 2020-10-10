import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import About from "./components/pages/About";
// import uuid from "react-uuid";
import axios from "axios";

import "./App.css";
// import Axios from "axios";

class App extends Component {
  // create state to be accessed
  state = {
    todos: [],
  };

  // Lifecycle method
  componentDidMount() {
    axios
      .get(`https://jsonplaceholder.typicode.com/todos?_limit=10`)
      .then((res) => this.setState({ todos: res.data }));
  }

  //  Toggle complete
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };

  //  Delete Todo
  delTodo = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) =>
        this.setState({
          todos: [...this.state.todos.filter((todo) => todo.id !== id)],
        })
      );
    // copy state with spread operator
  };

  // Add Todo
  addTodo = (title) => {
    // const newTodo = {
    //   id: uuid(),
    //   // key and value are the same
    //   // title: title,
    //   title,
    //   completed: false,
    // };
    axios
      .post(`https://jsonplaceholder.typicode.com/todos`, {
        title,
        completed: false,
      })
      .then((res) => this.setState({ todos: [...this.state.todos, res.data] }));
    // add to state - make copy with spread operator
  };
  // life cycle method
  render() {
    // taking

    return (
      // to use router everything must be wrappped in it
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            {/*  add route thatd single component */}
            {/* add component prop */}
            <Route
              exact
              path="/"
              render={(props) => (
                <>
                  <AddTodo addTodo={this.addTodo} />
                  {/* taking todos in state, passing  as prop to Todos component */}
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;