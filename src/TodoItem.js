import React, { Component } from 'react'

export default class TodoItem extends Component {
    render() {
        const { todo } = this.props;
        const { complete } = this.props.todo;

        
        
        return (<li key={todo.id} className={ complete ? 'complete' : ''}>
            <div className="todo-text">
            <h2 onClick = { () => this.props.handleToggle(todo) }>{todo.task}</h2>
            <button onClick = { () => this.props.handleDelete(todo) }>X</button>
            </div>
        </li>
        )
    }
}
