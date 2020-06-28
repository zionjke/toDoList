import React from 'react';
import {connect} from "react-redux";
import {createTodoList, deleteTodoList, getTodoLists} from "./redux/todolistsReducer";

import List from "./components/List/List";
import TodoList from "./components/TodoList";
import AddList from "./components/AddList/AddList";
import Login from "./components/Login/Login";
import {Route} from "react-router-dom";

class App extends React.Component {


    state = {
        activelist: ''
    };

    onClickList = (list) => {
        this.setState({
            activelist: list
        })
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
                {/*<Route path='/login' render={() => <Login/>}/>*/}
                <div className="todo__sidebar">
                    <List lists={this.props.todolists}
                          onClickList={this.onClickList}
                          activeList={this.state.activelist}
                          deleteList={this.deleteTodolist}/>
                    <AddList addTodoList={this.addTodoList}/>
                </div>
                <div className="todo__lists">
                    {this.props.todolists.map(todo => {
                        if(todo.id === this.state.activelist.id) {
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
        todolists: state.todolists.todolists
    }
};



const ConnectedApp = connect(mapStateToProps, {createTodoList,getTodoLists,deleteTodoList})(App);

export default ConnectedApp;



