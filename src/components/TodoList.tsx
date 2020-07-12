import React from 'react';
import TodoListTasks from "./Tasks/TodoListTasks";
import TodoListFooter from "./Footer/TodoListFooter";
import TodoListTitle from "./Title/TodoListTitle";
import {connect} from "react-redux";
import {addTask, changeTodoTask, deleteTodoTask, editTodoTitle, getTodoTasks} from "../redux/todolistsReducer";

import AddTaskForm from "./AddTask/AddTaskForm";
import {TaskType, UpdateTaskType} from "../types/entities";
import {AppStateType} from "../redux/store";

type StateType = {
    filterValue:string
}

type OwnPropsType = {
    id:string,
    title:string,
    tasks:Array<TaskType>
}

type MapDispatchPropsType = {
    addTask:(title:string, id:string) =>void
    changeTodoTask:(task:TaskType,obj:UpdateTaskType,id:string)=>void
    editTodoTitle:(id:string,title:string)=>void
    deleteTodoTask:(taskId:string,id:string)=>void
    getTodoTasks:(id:string) => void
}


type PropsType = OwnPropsType & MapDispatchPropsType

class TodoList extends React.Component<PropsType,StateType> {

    state:StateType = {
        filterValue: "All",
    };


    addTask = (title:string) => {
        this.props.addTask(title, this.props.id)
    };

    changeFilter = (newFilterValue:string) => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    changeTask = (task:TaskType, obj:UpdateTaskType) => {
        this.props.changeTodoTask(task, obj, this.props.id)
    };

    changeStatus = (task:TaskType, isDone:boolean) => {
        this.changeTask(task, {status: isDone ? 2 : 0});
    };

    changePriority = (task:TaskType,priority:number) => {
        this.changeTask(task,{priority:priority})
    };

    editTaskTitle = (task:TaskType, newTitle:string) => {
        this.changeTask(task, {title: newTitle});
    };


    deleteTask = (taskID:string) => {
        this.props.deleteTodoTask(taskID, this.props.id)
    };

    changeTodoTitle = (title:string) => {
        this.props.editTodoTitle(this.props.id, title)
    };


    componentDidMount() {
        this.props.getTodoTasks(this.props.id)
    };


    render = () => {

        let {tasks = []} = this.props;

        let filteredTask = tasks.filter(task => {
            if (this.state.filterValue === "All") {
                return true;
            }
            if (this.state.filterValue === "Active") {
                return task.status !== 2;
            }
            if (this.state.filterValue === "Completed") {
                return task.status === 2;
            }
        });

        return (
            <>
                <TodoListTitle title={this.props.title}
                               editTitle={this.changeTodoTitle}/>
                <TodoListTasks changeStatus={this.changeStatus}
                               changeTitle={this.editTaskTitle}
                               tasks={filteredTask}
                               deleteTask={this.deleteTask}
                               changePriority={this.changePriority}/>
                <TodoListFooter changeFilter={this.changeFilter}
                                filterValue={this.state.filterValue}
                                tasks={this.props.tasks}/>
                <AddTaskForm addTask={this.addTask}/>

            </>
        );
    }
}

export default connect<{},MapDispatchPropsType,OwnPropsType,AppStateType>(null, {addTask, changeTodoTask, deleteTodoTask, getTodoTasks, editTodoTitle})(TodoList)

