import React from 'react';
import TodoListTasks from "./Tasks/TodoListTasks";
import TodoListFooter from "./Footer/TodoListFooter";
import TodoListTitle from "./Title/TodoListTitle";
import {connect} from "react-redux";
import {addTask, changeTodoTask, deleteTodoTask, editTodoTitle, getTodoTasks} from "../redux/todolistsReducer";

import AddTaskForm from "./AddTask/AddTaskForm";

class TodoList extends React.Component {

    state = {
        filterValue: "All",
    };


    addTask = (title) => {
        this.props.addTask(title, this.props.id)
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    changeTask = (task, obj) => {
        this.props.changeTodoTask(task, obj, this.props.id)
    }

    changeStatus = (task, isDone) => {
        this.changeTask(task, {status: isDone ? 2 : 0});
    };

    editTaskTitle = (task, newTitle) => {
        this.changeTask(task, {title: newTitle});
    };


    deleteTask = (taskID) => {
        this.props.deleteTodoTask(taskID, this.props.id)
    };

    changeTodoTitle = (title) => {
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
                               deleteTask={this.deleteTask}/>
                <TodoListFooter changeFilter={this.changeFilter}
                                filterValue={this.state.filterValue}
                                tasks={this.props.tasks}/>
                <AddTaskForm addTask={this.addTask}/>

            </>
        );
    }
}


export default connect(null, {
    addTask,
    changeTodoTask,
    deleteTodoTask,
    getTodoTasks,
    editTodoTitle
})(TodoList)

