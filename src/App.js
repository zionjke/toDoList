import React from 'react';
import {connect} from "react-redux";
import {createTodoList, deleteTodoList, getTodoLists} from "./redux/todolistsReducer";
import List from "./components/List/List";
import TodoList from "./components/TodoList";
import AddList from "./components/AddList/AddList";
import {setActiveList} from "./actions/todolist";
import {Route} from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import AuthBlock from "./components/LoginForm/AuthBlock";


class App extends React.Component {


    onClickList = (list) => {
        this.props.setActiveList(list)
    };


    addTodoList = (title) => {
        this.props.createTodoList(title)

    };

    deleteTodolist = (todoId) => {
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
                              deleteList={this.deleteTodolist}/>
                        <AddList addTodoList={this.addTodoList}/>
                    </div>
                    <div className="todo__lists">
                        {this.props.todolist.map(todo => {
                            if(todo.id === this.props.activelist.id) {
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


const mapStateToProps = (state) => {
    return {
        todolist: state.todolist.todolists,
        activelist: state.todolist.activeList

    }
};



const ConnectedApp = connect(mapStateToProps, {createTodoList,getTodoLists,deleteTodoList,setActiveList})(App);

export default ConnectedApp;



