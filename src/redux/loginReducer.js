import {instance} from "../dal/api";


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
    instance.post('auth/login', {
        login,password,remembermy
    }).then((response) => {
        console.log(response.data)
    })
};


export default loginReducer