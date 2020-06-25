import React from 'react';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./Title/TodoListTitle";
import {connect} from "react-redux";
import {
    changeTaskActionCreator, changeTodoTitleAC,
    createTaskActionCreator,
    deleteTaskActionCreator,
    setTaskAC
} from "../redux/todolistsReducer";
import {api} from "../dal/api";
import {withRouter} from "react-router-dom";

class TodoList extends React.Component {

    state = {
        filterValue: "All",
    };


    addTask = (newText) => {
            api.addTask(newText,this.props.id).then(response => {
                    this.props.addTask(response.data.item ,this.props.id)
            });
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    changeTask = (task,obj) => {
       api.changeTask(task,obj,this.props.id).then( () => {this.props.updateTask(task.id,obj,this.props.id)});
    }

    changeStatus = (task, isDone) => {
        this.changeTask(task, {status: isDone ? 2 : 0});
    };

    changeTitle = (task, newTitle) => {
        this.changeTask(task, {title: newTitle});
    };

    changeTodoTitle = (title) => {
        api.changeTodoTitle(this.props.id,title).then (() => {this.props.editTitle(this.props.id,title)})
    };


    deleteTask = (taskID) => {
            api.deleteTask(this.props.id,taskID).then( () => {
                    this.props.deleteTask(taskID,this.props.id)
            });

    };


    componentDidMount() {
            api.getTasks(this.props.id).then(response => {
                    this.props.setTasks(this.props.id,response.items)
            });
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
                              changeTitle={this.changeTitle}
                              tasks={filteredTask}
                              deleteTask={this.deleteTask}/>
               <TodoListFooter changeFilter={this.changeFilter}
                               filterValue={this.state.filterValue}/>
               <AddNewItemForm addItem={this.addTask}/>
           </>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (newTask, todolistId) => {
            const action = createTaskActionCreator(newTask,todolistId);
            dispatch(action)
        },
        updateTask: (taskId, obj,todolistId) => {
            const action = changeTaskActionCreator(taskId,obj,todolistId);
            dispatch(action)
        },
        deleteTask: (taskId,todolistId) => {
            const action = deleteTaskActionCreator(taskId,todolistId);
            dispatch(action)
        },
        setTasks: (todolistId,task) =>  {
            const action = setTaskAC(todolistId,task);
            dispatch(action)
        },
        editTitle: (todolistId,title) => {
            const action = changeTodoTitleAC(todolistId,title);
            dispatch(action)
        }
    }
};
let WithUrlDataContainerComponent =  withRouter(TodoList);
export default connect(null, mapDispatchToProps)(WithUrlDataContainerComponent)

