import React, {createRef} from 'react'
import {connect} from "react-redux";
import {login} from "../../redux/loginReducer";
import {statuses} from "../../redux/loginReducer";
import {Redirect} from "react-router-dom";
import './LoginForm.scss'
import {AppStateType} from "../../redux/store";

type MapStatePropsType = {
    status:string
    isAuth:boolean
    message:string
}

type MapDispatchPropsType = {
    login:(email:string,password:string,rememberMe:boolean)=>void
}

const LoginForm:React.FC<MapStatePropsType & MapDispatchPropsType > = ({status,message,login,isAuth}) => {

    if(isAuth) {
        return <Redirect to='/'/>
    }

    let emailRef = React.createRef<HTMLInputElement>();
    let passwordRef = React.createRef<HTMLInputElement>();
    let rememberMeRef = React.createRef<HTMLInputElement>();

const onClickLogin = () => {
    // @ts-ignore
    login && login(emailRef.current?.value,
        passwordRef.current?.value,
        rememberMeRef.current?.checked)
};



    return (
        <div className='login__form'>
            <h2>Login</h2>
            <input className='field' ref={emailRef} placeholder='Введите свой email' type="text"/>
            <input  className='field' ref={passwordRef} placeholder='Введите пароль'  type="password"/>
            <span>Remember my:</span><input ref={rememberMeRef} type="checkbox"/>
                <button className='button' disabled={status === statuses.INPROGRESS} onClick={onClickLogin}>
                    Sign in
                </button>

            {
                status === statuses.ERROR &&
            <div className='error'>
                {message}
            </div>
            }
        </div>
    )
};


const mapStateToProps = (state:AppStateType):MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        status: state.login.status,
        message: state.login.message,
    }
};

export default connect<MapStatePropsType,MapDispatchPropsType,{},AppStateType>(mapStateToProps,{login})(LoginForm)