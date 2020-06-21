import React from 'react';
import './Title.scss'

class TodoListTitle extends React.Component {


    render = () => {
        return (
            <h3 className="todo__title">
                {this.props.title}
            </h3>
        );
    }
}

export default TodoListTitle


