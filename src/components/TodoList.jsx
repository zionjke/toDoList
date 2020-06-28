import React from 'react';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./Title/TodoListTitle";
import {connect} from "react-redux";
import {addTask, changeTodoTask, deleteTodoTask, editTodoTitle, getTodoTasks} from "../redux/todolistsReducer";

import {withRouter} from "react-router-dom";

class TodoList extends React.Component {

    state = {
        filterValue: "All",
    };


    addTask = (title) => {
        this.props.addTask(title,this.props.id)
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    changeTask = (task,obj) => {
        this.props.changeTodoTask(task,obj,this.props.id)
    }

    changeStatus = (task, isDone) => {
        this.changeTask(task, {status: isDone ? 2 : 0});
    };

    editTaskTitle = (task, newTitle) => {
        this.changeTask(task, {title: newTitle});
    };


    deleteTask = (taskID) => {
        this.props.deleteTodoTask(taskID,this.props.id)
    };

    changeTodoTitle = (title) => {
        this.props.editTodoTitle(this.props.id,title)
    }


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
                               filterValue={this.state.filterValue}/>
               <AddNewItemForm addItem={this.addTask}/>
           </>
        );
    }
}


let WithUrlDataContainerComponent =  withRouter(TodoList);
export default connect(null, {addTask,changeTodoTask,deleteTodoTask,getTodoTasks,editTodoTitle})(WithUrlDataContainerComponent)

