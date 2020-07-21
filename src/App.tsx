import React from 'react';
import {connect} from "react-redux";
import {createTodoList, deleteTodoList, getTodoLists} from "./redux/todolistsReducer";
import List from "./components/List/List";
import TodoList from "./components/TodoList";
import AddList from "./components/AddList/AddList";
import {setActiveListAC} from "./actions/todolist";
import {Route, Redirect} from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import AuthBlock from "./components/LoginForm/AuthBlock";
import {TodoType} from "./types/entities";
import {AppStateType} from "./redux/store";

type MapStatePropsType = {
    todolist: Array<TodoType>
    activelist: any
    isAuth:boolean
}

type MapDispatchPropsType = {
    setActiveListAC:(list:any)=> void
    createTodoList:(title:string)=>void
    deleteTodoList:(todoId:string)=>void
    getTodoLists:()=>void
}

class App extends React.Component<MapStatePropsType & MapDispatchPropsType > {


    onClickList = (list:any) => {
        this.props.setActiveListAC(list)
    };


    addTodoList = (title:string) => {
        this.props.createTodoList(title)

    };

    deleteTodolist = (todoId:string) => {
        this.props.deleteTodoList(todoId)
    };


    componentDidMount() {
        this.props.getTodoLists()
    };


    render = () => {
        return (
            <div className='todo'>
                <Route path='/login' render={() => <LoginForm/>}/>
                <div className="todo__sidebar">
                    <AuthBlock/>
                    <List lists={this.props.todolist}
                          onClickList={this.onClickList}
                          activeList={this.props.activelist}
                          deleteTodolist={this.deleteTodolist}/>
                    <AddList isAuth={this.props.isAuth} addTodoList={this.addTodoList}/>
                </div>
                <div className="todo__lists">
                    {this.props.todolist.map(todo => {
                        if (todo.id === this.props.activelist.id) {
                            return <TodoList key={todo.id}
                                             id={todo.id}
                                             title={todo.title}
                                             tasks={todo.tasks}/>
                        }
                    })}
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state:AppStateType):MapStatePropsType => {
    return {
        todolist: state.todolist.todolists,
        activelist: state.todolist.activeList,
        isAuth:state.auth.isAuth
    }
};


export default  connect<MapStatePropsType,MapDispatchPropsType,{},AppStateType>(mapStateToProps, {createTodoList, getTodoLists, deleteTodoList, setActiveListAC})(App);





