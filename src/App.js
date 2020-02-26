import React, { Component } from 'react';
import { 
  Route, 
  Switch,
  BrowserRouter as Router, 
} from 'react-router-dom';
import TodoList from './TodoList.js';
import Header from './Header.js';
// import AddTodoForm from './AddTodoForm.js';
// import DeleteTodo from './DeleteTodo.js';

import './App.css';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={TodoList} />  
                </Switch>

                </div>
            </Router>
        )
    }
}
