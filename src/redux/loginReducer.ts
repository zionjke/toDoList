import {loginInstance} from "../dal/api";
import {SET_MESSAGE, SET_STATUS, setMessage, setStatus, LoginActionTypes,} from "../actions/login";
import {AuthActionTypes, setIsAuth} from "../actions/auth";
import {authMe} from "./authReducer";
import {getTodoLists} from "./todolistsReducer";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./store";

export const statuses = {
    INIT: 'INIT',
    ERROR: 'ERROR',
    INPROGRESS: 'INPROGRESS',
    CAPTCHAREQUIRED: 'CAPTCHAREQUIRED',
    SUCCESS: 'SUCCESS'
};


type InitialStateType = {
    status: string
    message:string
}


const initialState:InitialStateType = {
    status: statuses.INIT,
    message:'',
};

const loginReducer = (state:InitialStateType=initialState,action:LoginActionTypes) => {
    switch (action.type) {
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        case SET_MESSAGE:
            return {
                ...state,
                message: action.message
            }
    }
    return state
};

type ThunkType = ThunkAction<void, AppStateType, unknown, LoginActionTypes>

export const login = (email:string,password:string,rememberMe:boolean):ThunkType => (dispatch:ThunkDispatch<AppStateType, unknown, LoginActionTypes>) => {
    dispatch(setStatus(statuses.INPROGRESS));
    loginInstance.post('auth/login', {
        email,
        password,
        rememberMe
    }).then((response) => {
        if(response.data.resultCode === 0) {
            dispatch(setStatus(statuses.SUCCESS));
            // dispatch(setIsAuth(true));
            dispatch(authMe());
            dispatch(getTodoLists())
        } else {
            dispatch(setStatus(statuses.ERROR));
            dispatch(setMessage(response.data.messages[0]))
        }
    })
};



export default loginReducer