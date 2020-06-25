import React from 'react';
import './Title.scss'

class TodoListTitle extends React.Component {

    state = {
        isEditMode: false
    };

    activatedEditMode = () => {
        this.setState({isEditMode: true})
    };

    deactivatedEditMode = (e) => {
        this.props.editTitle(e.currentTarget.value);
        this.setState({isEditMode: false})
    };

    render = () => {
        return (
            <div className="todo__title">
                {this.state.isEditMode
                    ? <input defaultValue={this.props.title}
                             autoFocus={true}
                             onBlur={this.deactivatedEditMode}
                    />
                    : <span onClick={this.activatedEditMode}>
                             {this.props.title}
                    </span>
                }
            </div>
        );
    }
}

export default TodoListTitle


