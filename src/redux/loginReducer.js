import {loginInstance} from "../dal/api";
import { SET_MESSAGE, SET_STATUS, setMessage, setStatus} from "../actions/authLogin";

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

const loginReducer = (state=initialState,action) => {
    switch (action.type) {
        case SET_STATUS:
            return {
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

export const login = (email,password,rememberMe,) => (dispatch) => {
    dispatch(setStatus(statuses.INPROGRESS));
    loginInstance.post('auth/login', {
        email,
        password,
        rememberMe
    }).then((response) => {
        if(response.data.resultCode === 0) {
            dispatch(setStatus(statuses.SUCCESS));
            alert('Вы залогинились')
        } else {
            dispatch(setStatus(statuses.ERROR))
            dispatch(setMessage(response.data.messages[0]))
        }
    })
};


export default loginReducer