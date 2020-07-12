import {applyMiddleware, combineReducers, createStore} from "redux";
import loginReducer from "./loginReducer";
import todolistsReducer from "./todolistsReducer";
import thunk from "redux-thunk";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    login: loginReducer,
    todolist: todolistsReducer,
    auth: authReducer
});

export type AppStateType = ReturnType<typeof rootReducer>

const store = createStore(rootReducer,applyMiddleware(thunk));

export default store