import React from 'react'
import {connect} from "react-redux";
import {login} from "../../redux/loginReducer";
import {statuses} from "../../actions/login";
import {Redirect} from "react-router-dom";
import './LoginForm.scss'

export const LoginForm = ({status,message,login,isAuth}) => {

    if(isAuth) {
        return <Redirect to='/'/>
    }

    let emailRef = React.createRef();
    let passwordRef = React.createRef();
    let rememberMeRef = React.createRef();

const onClickLogin = () => {
    login && login(emailRef.current.value,
        passwordRef.current.value,
        rememberMeRef.current.checked)
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

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        status: state.login.status,
        message: state.login.message,
        captchaUrl: state.login.captchaUrl
    }
};

export default connect(mapStateToProps,{login})(LoginForm)