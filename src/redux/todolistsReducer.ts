import {
    CHANGE_TASK,
    CHANGE_TODO_TITLE,
    CREATE_TASK,
    CREATE_TODOLIST,
    createTodoAC,
    DELETE_TASK,
    DELETE_TODO,
    SET_ACTIVE_LIST,
    SET_TODOLISTS,
    SET_TODOLISTS_TASKS,
    TodoActionTypes,
    setTodoListAC, setTasksAC, createTaskAC, deleteTodoAC, changeTodoTitleAC, deleteTaskAC, updateTaskAC
} from "../actions/todolist";
import {api} from "../dal/api";
import {TaskType, TodoType, UpdateTaskType} from "../types/entities";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./store";

type InitialStateType = {
    todolists: Array<TodoType>
    activeList: any
}

const initialState: InitialStateType = {
    todolists: [],
    activeList: {}
};

const todolistsReducer = (state: InitialStateType = initialState, action: TodoActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists.map(todo => {
                    return {
                        ...todo,
                        tasks: []
                    }
                })
            };
        case SET_TODOLISTS_TASKS:
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id !== action.todolistId) {
                        return todo
                    } else {
                        return {
                            ...todo,
                            tasks: action.tasks
                        }
                    }
                })
            };
        case CREATE_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newTodolist]
            };
        case CREATE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                        if (todo.id !== action.todolistId) {
                            return todo
                        } else {
                            return {
                                ...todo,
                                tasks: [...todo.tasks, action.newTask]
                            }
                        }
                    }
                )
            };
        case CHANGE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id !== action.todolistId) {
                        return todo
                    } else {
                        return {
                            ...todo,
                            tasks: todo.tasks.map(task => {
                                if (task.id !== action.taskId) {
                                    return task
                                } else {
                                    return {
                                        ...task,
                                        ...action.obj
                                    }
                                }
                            })
                        }
                    }
                })
            };
        case CHANGE_TODO_TITLE: {
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id !== action.todolistId) {
                        return todo
                    } else {
                        return {
                            ...todo,
                            title: action.title
                        }
                    }
                })
            }
        }
        case DELETE_TODO:
            return {
                ...state,
                todolists: state.todolists.filter(todo => todo.id !== action.todolistId)
            };
        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id !== action.todolistId) {
                        return todo
                    } else {
                        return {
                            ...todo,
                            tasks: todo.tasks.filter(t => t.id !== action.taskId)
                        }
                    }
                })
            };
        case SET_ACTIVE_LIST:
            return {
                ...state,
                activeList: action.activeList
            }

    }
    return state;
};

type ThunkType = ThunkAction<void, AppStateType, unknown, TodoActionTypes>

export const createTodoList = (title: string): ThunkType => (dispatch: ThunkDispatch<AppStateType, unknown, TodoActionTypes>) => {
    api.createTodolist(title).then(response => {
        dispatch(createTodoAC(response.data.data.item))
    });
};

export const getTodoLists = (): ThunkType => (dispatch: ThunkDispatch<AppStateType, unknown, TodoActionTypes>) => {
    api.getTodolist().then(response => {
        dispatch(setTodoListAC(response.data))
    });
};

export const getTodoTasks = (todoId: string): ThunkType => (dispatch: ThunkDispatch<AppStateType, unknown, TodoActionTypes>) => {
    api.getTasks(todoId).then(response => {
        dispatch(setTasksAC(todoId, response.data.items))
    })
};

export const addTask = (title: string, todoId: string): ThunkType => (dispatch: ThunkDispatch<AppStateType, unknown, TodoActionTypes>) => {
    api.createTask(title, todoId).then(response => {
        dispatch(createTaskAC(response.data.data.item, todoId))
    });
};

export const deleteTodoList = (todoId: string): ThunkType => (dispatch: ThunkDispatch<AppStateType, unknown, TodoActionTypes>) => {
    api.deleteTodo(todoId).then(() => {
        dispatch(deleteTodoAC(todoId))
    });
};

export const editTodoTitle = (todoId: string, title: string): ThunkType => (dispatch: ThunkDispatch<AppStateType, unknown, TodoActionTypes>) => {
    api.changeTodoTitle(todoId, title).then(() => {
        dispatch(changeTodoTitleAC(todoId, title))
    })
};

export const deleteTodoTask = (taskId: string, todoId: string): ThunkType => (dispatch: ThunkDispatch<AppStateType, unknown, TodoActionTypes>) => {
    api.deleteTask(todoId, taskId).then(() => {
        dispatch(deleteTaskAC(taskId, todoId))
    });
};

export const changeTodoTask = (task: TaskType, obj: UpdateTaskType, todoId: string): ThunkType => (dispatch: ThunkDispatch<AppStateType, unknown, TodoActionTypes>) => {
    api.changeTask(task, obj, todoId).then(() => {
        dispatch(updateTaskAC(task.id, obj, todoId))
    });
};


export default todolistsReducer