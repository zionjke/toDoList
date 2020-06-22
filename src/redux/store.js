import {applyMiddleware, combineReducers, createStore} from "redux";
import loginReducer from "./loginReducer";
import todolistsReducer from "./todolistsReducer";
import thunk from "redux-thunk";




const store = createStore(combineReducers({
    login: loginReducer,
    todolists: todolistsReducer
}),applyMiddleware(thunk));

export default store