import React, { Component } from 'react'
import request from 'superagent'
import { Link } from 'react-router-dom';
import TodoItem from './TodoItem.js';
import AddTodo from './AddTodo.js';


export default class TodoList extends Component {
    state = {
        todos: [],
    }

    async getTodos() {
        const todoData = await request.get('https://sleepy-journey-35699.herokuapp.com/api/todos');
        return todoData;
    }
    async componentDidMount() {
        const todoData = await this.getTodos();
        this.setState({ todos: todoData.body });
    }

    handleClick = async () => {
        const newTodo = {
            id: Math.random(),
            todoInput: '',
            task: this.state.todoInput,
            complete: false
        }
        const newTodos = [...this.state.todos, newTodo];
        //spread todos and insert newTodo
        this.setState({ todos: newTodos })
        const data = await request.post('https://sleepy-journey-35699.herokuapp.com/api/todos', {
            task: this.state.todoInput
        });
        //post new todo into db
        console.log(data.body);

    }
    handleInput  = e => {
        this.setState({todoInput: e.target.value})
    }
    render() {
        return (
            <div id="todoContainer">
                <AddTodo 
                     todoInput={ this.state.todoInput } 
                     handleClick={ this.handleClick } 
                     handleInput={ this.handleInput }
                />
                
                    
                {this.state.todos.map(todo =>
                    <Link key={todo.id} to={`/todos/${todo.id}`}>
                    <TodoItem todo = {todo} />
                    </Link>
                )}
                
            </div>
        )
    }
}
