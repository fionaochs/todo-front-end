import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class TodoItem extends Component {
    render() {
        const { todo } = this.props;

        return (<li key={todo.id}>
            <div className="todo-text">
            <h2>{todo.task}</h2>
            <p>{todo.complete}</p>
            {/* <Link key={todo.id} to={`/edit/${todo.id}`}>Edit this todo</Link> */}
            </div>
        </li>
        )
    }
}
