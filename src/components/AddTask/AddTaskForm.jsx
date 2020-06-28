import React from 'react'
import AddNewItemForm from "../AddNewItemForm";
import addSvg from './../../assets/img/add.svg'
import './AddTaskForm.scss'

class AddTaskForm extends React.Component {

    state = {
        isVisibleForm: false
    }

    toggleFormVisible = () => {
        this.setState({
            isVisibleForm: !this.state.isVisibleForm
        })
    }

    render() {
        return (
            <div className='tasks__form'>
                {!this.state.isVisibleForm ? <div onClick={this.toggleFormVisible} className='tasks__form-new'>
                        <img src={addSvg} alt="Add Icon"/>
                        <span>Новая задача</span>
                    </div> :
                    <div className='tasks__form-block'>
                        <AddNewItemForm cancelButton
                                        btnname='Добавить задачу'
                                        addItem={this.props.addTask}
                                        toggleFormVisible={this.toggleFormVisible}
                                        placeholder='Имя задачи'/>
                    </div>
                }
            </div>
        )
    }
}

export default AddTaskForm