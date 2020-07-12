import React from 'react';
import TodoListTask from "./TodoListTask";
import './Tasks.scss'
import {TaskType} from "../../types/entities";

type OwnPropsType = {
    tasks:Array<TaskType>
    changeStatus: (task:TaskType,isDone:boolean) => void
    changeTitle:(task:TaskType,title:string) => void
    deleteTask: (id:string) => void
    changePriority:(task:TaskType,priority:number)=>void
}

class TodoListTasks extends React.Component<OwnPropsType> {
    render = () => {

        let taskItem = this.props.tasks.map(task => <TodoListTask key={task.id}
                                                                  task={task}
                                                                  changeStatus={this.props.changeStatus}
                                                                  changeTitle={this.props.changeTitle}
                                                                  deleteTask={this.props.deleteTask}
                                                                  changePriority={this.props.changePriority}/>);

        return (
            <div className="todo__tasks">
                {this.props.tasks && !this.props.tasks.length ? <h2>Задачи отсутствуют</h2> : taskItem}
            </div>
        );
    }
}

export default TodoListTasks;

