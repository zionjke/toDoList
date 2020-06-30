import React from 'react'
import {connect} from "react-redux";
import {login, statuses} from "../../redux/loginReducer";

export const Login = ({status,message,login}) => {

    let emailRef = React.createRef();
    let passwordRef = React.createRef();
    let rememberMeRef = React.createRef();

const onClickLogin = () => {
    login && login(emailRef.current.value,
        passwordRef.current.value,
        rememberMeRef.current.checked)
};

    return (
        <div>
            <div><input ref={emailRef} defaultValue='vincere802@gmail.com' type="text"/></div>
            <div><input ref={passwordRef} defaultValue='eok2Ydkm'  type="password"/></div>
            <div><input ref={rememberMeRef} type="checkbox"/></div>
            <div>
                <button disabled={status === statuses.INPROGRESS} onClick={onClickLogin}>
                    Login
                </button>
            </div>
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
        // isAuth: state.login.isAuth,
        status: state.login.status,
        message: state.login.message,
        captchaUrl: state.login.captchaUrl
    }
};

export default connect(mapStateToProps,{login})(Login)