import React, { Component } from 'react';
import { 
  Route, 
  Switch,
  Redirect,
  BrowserRouter as Router, 
} from 'react-router-dom';
import TodoList from './TodoList.js';
import Header from './Header.js';
import TodoAppLogin from './TodoAppLogin.js';

import './App.css';

const isLoggedIn = () => JSON.parse(localStorage.getItem('user'));

export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                <Header />
                <Switch>
                    <Route exact path='/' render={() => 
                    isLoggedIn() ? <TodoList /> : <Redirect to='/login' /> }/>
                 <Route exact path='/login' component={TodoAppLogin} />

                </Switch>

                </div>
            </Router>
        )
    }
}
