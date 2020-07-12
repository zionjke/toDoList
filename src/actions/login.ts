type SetStatusActionType  = {
    type: typeof SET_STATUS
    status:string
}

type SetMessageActionType = {
    type: typeof SET_MESSAGE
    message:string
}

export type LoginActionTypes = SetStatusActionType | SetMessageActionType


export const SET_STATUS = 'APP/LOGIN/SET_STATUS';
export const SET_MESSAGE = 'APP/LOGIN/SET_MESSAGE';




export const setStatus = (status:string):SetStatusActionType => {
    return {
        type: SET_STATUS,
        status
    }
};

export const setMessage = (message:string):SetMessageActionType => {
    return {
        type: SET_MESSAGE,
        message
    }
};