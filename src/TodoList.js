import React, { Component } from 'react'
import request from 'superagent'
import TodoItem from './TodoItem.js';
import AddTodo from './AddTodo.js';


export default class TodoList extends Component {
    state = {
        todos: [],
    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        //get user from local storage
        const todoData = await request.get('https://sleepy-journey-35699.herokuapp.com/api/todos')
            .set('Authorization', user.token);
        this.setState({ todos: todoData.body });
        console.log(todoData.body);
    }

    handleClick = async () => {
       
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user)
        
        const data = await request.post('https://sleepy-journey-35699.herokuapp.com/api/todos', {
            task: this.state.todoInput
        })
        .set('Authorization', user.token);
        this.setState({ todos: [...this.state.todos, data.body]})
        ;
        //post new todo into db
        console.log(data.body);

    }
    handleInput  = e => {
        this.setState({todoInput: e.target.value})
    }
    handleToggle = async (todo) => {
        const newTodos = this.state.todos.slice();
        const matchingTodo = newTodos.find((thisTodo) => todo.id === thisTodo.id);
       
        matchingTodo.complete = !todo.complete
        const user = JSON.parse(localStorage.getItem('user'));

        this.setState({ todos: newTodos });
         const data = await request.put(`https://sleepy-journey-35699.herokuapp.com/api/todos/${todo.id}`, matchingTodo)
            .set('Authorization', user.token);
    }
    handleDelete = async (todo) => {
        const newTodos = this.state.todos.slice();
        const matchingTodo = newTodos.find((thisTodo) => todo.id === thisTodo.id);
       
        const user = JSON.parse(localStorage.getItem('user'));

        this.setState({ todos: newTodos });
         const data = await request.delete(`https://sleepy-journey-35699.herokuapp.com/api/todos/${todo.id}`, matchingTodo)
            .set('Authorization', user.token);

            newTodos.splice(this.state.todos.findIndex(listItem => {
                return listItem.id === todo.id
            }), 1)
            // findIndex loops through todos and finds one in list that matches the todo were passing in
            //splice at that index and remove
            //set new state
            this.setState({todos: newTodos});
            
    }
    render() {
        if (localStorage.getItem('user')) {
        return (
            <div id="todoContainer">
                <AddTodo 
                     todoInput={ this.state.todoInput } 
                     handleClick={ this.handleClick } 
                     handleInput={ this.handleInput }
                />
                
                {this.state.todos.map((todo) =>
                    <TodoItem 
                        handleToggle = { this.handleToggle }
                        handleDelete = { this.handleDelete }
                        todo = {todo} 
                        complete={ this.state.complete }/>
                )}
                
            </div>
        )
    }
}
}      