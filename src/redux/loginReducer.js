import {loginInstance} from "../dal/api";

const SET_STATUS = 'SET_STATUS'
const SET_MESSAGE = 'SET_MESSAGE'

export const statuses = {
    INIT: 'INIT',
    ERROR: 'ERROR',
    INPROGRESS: 'INPROGRESS',
    CAPTCHAREQUIRED: 'CAPTCHAREQUIRED',
    SUCCESS: 'SUCCESS'
};

const initialState = {
    isAuth:'',
    status: statuses.INIT,
    message:'',
    captchaUrl:''
};

const loginReducer = (state= initialState,action) => {
    switch (action.type) {
        case SET_STATUS:
            return{
                ...state,
                status: action.status
            }
        case SET_MESSAGE:
            return {
                ...state,
                message: action.message
            }
    }
    return state
};

export const login = (email,password,remembermy,) => (dispatch) => {
    dispatch(setStatus(statuses.INPROGRESS))
    loginInstance.post('/auth/login', {
        email,password,remembermy
    }).then((response) => {
       if(response.data.resultCode === 0) {
           dispatch(setStatus(statuses.SUCCESS))
           alert('Мы залогинились')
       } else {
           dispatch(setStatus(statuses.ERROR))
           dispatch(setMessage(response.data.messages[0])) // Incorrect password or email
       }
    })

};

export const setStatus = (status) => {
    return {
        type:SET_STATUS,
        status
    }
}

export const setMessage = (message) => {
    return {
        type: SET_MESSAGE,
        message
    }
}


export default loginReducer