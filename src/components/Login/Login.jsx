import React from 'react'
import {connect} from "react-redux";
import {setStatus} from "../../redux/loginReducer";

export const Login = (props) => {

    let loginRef = React.createRef();
    let passwordRef = React.createRef();
    let rememberMeRef = React.createRef();

const onClickLogin = () => {
    debugger
    props.setStatus && props.setStatus(loginRef.current.value,
        passwordRef.current.value,
        rememberMeRef.current.checked)
};



    return (
        <div>
            <div><input ref={loginRef} defaultValue='vincere802@gmail.com' type="text"/></div>
            <div><input defaultValue='eok2Ydkm' ref={passwordRef} type="password"/></div>
            <div><input ref={rememberMeRef} type="checkbox"/></div>
            <div>
                <button onClick={onClickLogin}>
                    Login
                </button>
            </div>
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

export default connect(mapStateToProps,{setStatus})(Login)