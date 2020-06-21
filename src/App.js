import React from 'react';
import {connect} from "react-redux";
import {createTodoActionCreator, deleteTodoActionCreator, setTodoListAC} from "./redux/reducer";
import {api} from "./dal/api";
import List from "./components/List/List";
import TodoList from "./components/TodoList";
import AddList from "./components/AddList/AddList";

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
        api.createTodolist(title)
            .then(response => {this.props.createTodolists(response.data.item)})

    };

    deleteTodolist = (todolistId) => {
        api.deleteTodo(todolistId).then( () => {this.props.deleteTodo(todolistId)});
    };




    componentDidMount() {
        api.getTodolist().then(response => {this.props.setTodolists(response)});
    };



    render = () => {

        return (
            <div className='todo'>
                <div className="todo__sidebar">
                    <List lists={this.props.todolists}
                          onClickList={this.onClickList}
                          activeList={this.state.activelist}
                          deleteList={this.deleteTodolist}/>
                          <AddList addTodoList={this.addTodoList}/>
                </div>
                <div className="todo__lists">
                    {this.props.todolists && this.state.activelist && (
                        <TodoList key={this.state.activelist.id}
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
        },
        deleteTodo: (todolistId) => {
            const action = deleteTodoActionCreator(todolistId);
            dispatch(action)
        },
    }
};

const ConnectedApp = connect(mapStateToProps,mapDispatchToProps)(App);

export default ConnectedApp;



