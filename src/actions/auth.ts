export const SET_IS_AUTH = 'APP/AUTH/SET_IS_AUTH';
export const SET_USER_INFO = 'APP/AUTH/SET_USER_INFO';

type SetIsAuthActionType = {
    type: typeof SET_IS_AUTH
    isAuth:boolean
}

type SetUserInfoActionType = {
    type: typeof SET_USER_INFO
    userId: string
    login:string
}

export type AuthActionTypes = SetIsAuthActionType | SetUserInfoActionType

export const setIsAuth = (isAuth:boolean):SetIsAuthActionType => {
    return {
        type: SET_IS_AUTH,
        isAuth
    }
};

export const setUserInfo = (userId:string,login:string):SetUserInfoActionType => {
    return {
        type: SET_USER_INFO,
        userId,login
    }
};