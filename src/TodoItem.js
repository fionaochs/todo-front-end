import React, { Component } from 'react'

export default class TodoItem extends Component {
    render() {
        const { todo } = this.props;
        const { complete } = this.props.todo;

        
        
        return (<li key={todo.id} >
            <div className="todo-text">
            <h2 onClick = { () => this.props.handleToggle(todo) } className={ complete ? 'complete' : ''}>{todo.task}</h2>
            <button className="button" onClick = { () => this.props.handleDelete(todo) }>X</button>
            </div>
        </li>
        )
    }
}
