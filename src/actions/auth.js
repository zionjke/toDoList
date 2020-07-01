export const SET_IS_AUTH = 'APP/AUTH/SET_IS_AUTH';
export const SET_USER_INFO = 'APP/AUTH/SET_USER_INFO';

export const setIsAuth = (isAuth) => {
    return {
        type: SET_IS_AUTH,
        isAuth
    }
};

export const setUserInfo = (userId,login) => {
    return {
        type: SET_USER_INFO,
        userId,login
    }
};