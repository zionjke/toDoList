import React from 'react';
import './Title.scss'

type StateType = {
    isEditMode:boolean

}

type OwnPropsType = {
    editTitle:(title:string)=>void
    title:string
}

class TodoListTitle extends React.Component<OwnPropsType,StateType> {

    state:StateType = {
        isEditMode: false
    };

    activatedEditMode = () => {
        this.setState({isEditMode: true})
    };

    deactivatedEditMode = (e:React.FocusEvent<HTMLInputElement>) => {
        this.props.editTitle(e.currentTarget.value);
        this.setState({isEditMode: false})
    };

    render = () => {
        return (
            <div className="todo__title">
                {this.state.isEditMode
                    ? <input className='field' defaultValue={this.props.title}
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


