import {applyMiddleware, combineReducers, createStore} from "redux";
import loginReducer from "./loginReducer";
import todolistsReducer from "./todolistsReducer";
import thunk from "redux-thunk";
import authReducer from "./authReducer";


const store = createStore(combineReducers({
    login: loginReducer,
    todolist: todolistsReducer,
    auth: authReducer
}),applyMiddleware(thunk));

export default store