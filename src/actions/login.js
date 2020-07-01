export const statuses = {
    INIT: 'INIT',
    ERROR: 'ERROR',
    INPROGRESS: 'INPROGRESS',
    CAPTCHAREQUIRED: 'CAPTCHAREQUIRED',
    SUCCESS: 'SUCCESS'
};

export const SET_STATUS = 'APP/LOGIN/SET_STATUS';
export const SET_MESSAGE = 'APP/LOGIN/SET_MESSAGE';


export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        status
    }
};

export const setMessage = (message) => {
    return {
        type: SET_MESSAGE,
        message
    }
};