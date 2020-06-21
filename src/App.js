import React from 'react';
import {connect} from "react-redux";
import {createTodoActionCreator, setTodoListAC} from "./redux/reducer";
import {api} from "./dal/api";
import List from "./components/List/List";
import TodoList from "./components/TodoList";

class App extends React.Component {

    state = {
        activelist: ''
    };

    onClickList = (list) => {
        this.setState({
            activelist: list
        })
    }

    addTodoList = (title) => {
        api.createTodolist(title).then(response => {
                    this.props.createTodolists(response.data.item)
            });
    };

    componentDidMount() {
        api.getTodolist().then(response => {this.props.setTodolists(response)});
    };



    render = () => {

        // const todolist = this.props.todolists.map(todo => <TodoList key={todo.id}
        //                                                           id={todo.id}
        //                                                           title={todo.title}
        //                                                           tasks={todo.tasks}/>);

        return (
            <div className='todo'>
                <div className="todo__sidebar">
                    <List lists={this.props.todolists}
                          onClickList={this.onClickList}
                          activeList={this.state.activelist}/>
                </div>
                <div className="todo__lists">
                    {this.props.todolists && this.state.activelist && (
                        <TodoList
                                  id={this.state.activelist.id}
                                  title={this.state.activelist.title}
                                  tasks={this.state.activelist.tasks}/>
                    )}
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
       createTodolists: (newTodolist) => {
           const action = createTodoActionCreator(newTodolist);
           dispatch(action)
       },
        setTodolists: (todolists) => {
           const action = setTodoListAC(todolists);
           dispatch(action)
        }
    }
};

const ConnectedApp = connect(mapStateToProps,mapDispatchToProps)(App);

export default ConnectedApp;



