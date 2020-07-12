import {AuthActionTypes, SET_IS_AUTH, SET_USER_INFO, setIsAuth, setUserInfo} from "../actions/auth";
import {loginInstance} from "../dal/api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./store";


type InitialStateType = {
    isAuth:boolean
    userInfo : {
        userId:string
        login:string
    }
}

const initialState:InitialStateType = {
    isAuth:false,
    userInfo: {
        userId: "",
        login: "",
    }
};

const authReducer = (state:InitialStateType = initialState,action:AuthActionTypes):InitialStateType => {
    switch (action.type) {
        case SET_IS_AUTH:
            return {
                ...state,
                isAuth: action.isAuth
            };
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    login: action.login,
                    userId: action.userId
                }
            }
    }
    return state
};

type ThunkType = ThunkAction<void, AppStateType, unknown, AuthActionTypes>

export const authMe = ():ThunkType => (dispatch:ThunkDispatch<AppStateType, unknown, AuthActionTypes>) => {
    loginInstance.get('auth/me').then(({data}) => {
        if(data.resultCode === 0) {
            dispatch(setIsAuth(true));
            dispatch(setUserInfo(data.data.userId,data.data.login))
        }
    })
};

export const logOut = ():ThunkType => (dispatch:ThunkDispatch<AppStateType, unknown, AuthActionTypes>) => {
    loginInstance.delete('auth/login').then(() => {
        dispatch(setIsAuth(false));
        window.location.reload(false); // refresh page
    })
};


export default authReducer