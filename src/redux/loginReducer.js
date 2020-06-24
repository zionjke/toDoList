import {loginInstance} from "../dal/api";


const LOGIN = 'LOGIN';

const statuses = {
    INIT: 'INIT',
    ERROR: 'ERROR',
    INPROGRESS: 'INPROGRESS',
    CAPTCHAREQUIRED: 'CAPTCHAREQUIRED'
};

const initialState = {
    isAuth:'',
    status: statuses.INIT,
    message:'',
    captchaUrl:''
};

const loginReducer = (state=initialState,action) => {
    switch (action.type) {
        case LOGIN:
            return{
                ...state,

            }
    }
    return state
};

export const setStatus = (login,password,remembermy,) => (dispatch) => {
    loginInstance.post('auth/login', {
        login,password,remembermy
    }).then((response) => {
        debugger
    })
};


export default loginReducer