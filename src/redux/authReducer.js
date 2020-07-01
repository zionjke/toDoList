import {SET_IS_AUTH, SET_USER_INFO, setIsAuth, setUserInfo} from "../actions/auth";
import {loginInstance} from "../dal/api";
import {getTodoLists} from "./todolistsReducer";

const initialState = {
    isAuth:false,
    userInfo: {
        userId: null,
        login: null,
    }
};

const authReducer = (state = initialState,action) => {
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

export const authMe = () => (dispatch) => {
    loginInstance.get('auth/me').then(({data}) => {
        if(data.resultCode === 0) {
            dispatch(setIsAuth(true));
            dispatch(setUserInfo(data.data.userId,data.data.login))
        }
    })
};

export const logOut = () => (dispatch) => {
    loginInstance.delete('auth/login').then(() => {
        dispatch(setIsAuth(false))
        window.location.reload(false);
    })
};


export default authReducer