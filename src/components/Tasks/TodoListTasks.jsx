import React from 'react';
import TodoListTask from "./TodoListTask";
import './Tasks.scss'

class TodoListTasks extends React.Component {
    render = () => {

        let taskItem = this.props.tasks.map ( task => <TodoListTask key={task.id}
                                                                    {...task}
                                                                  task={task}
                                                                  changeStatus={this.props.changeStatus}
                                                                  changeTitle={this.props.changeTitle}
                                                                  deleteTask={this.props.deleteTask}/>);

        return (
            <div className="todo__tasks">
                {this.props.tasks && !this.props.tasks.length ? <h2>Задачи отсутствуют</h2> : taskItem}
            </div>
        );
    }
}

export default TodoListTasks;

