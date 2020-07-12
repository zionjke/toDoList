import React from 'react'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {authMe, logOut} from "../../redux/authReducer";
import loginIcon from '../../assets/img/login.png'
import './AuthBlock.scss'
import logOutIcon from './../../assets/img/log-out.png'
import {AppStateType} from "../../redux/store";

type MapStatePropsType = {
    isAuth:boolean
}

type MapDispatchPropsType = {
    authMe:() => void
    logOut:() => void
}

class AuthBlock extends React.Component<MapStatePropsType & MapDispatchPropsType > {

    componentDidMount() {
        this.props.authMe()
    }

    onLogOutClick = () => {
        if(window.confirm('Вы действительно хотите выйти?')) {
            this.props.logOut()
        }
    };

    render() {
        const {isAuth} = this.props;
        return (
            <div className='auth__block'>
                {isAuth && <img className={'auth__block-logout'} onClick={this.onLogOutClick} src={logOutIcon} alt="Log Out Icon"/>}
                {!isAuth && <div>
                    <NavLink to='/login'>
                        <img className='auth__block-login' src={loginIcon} alt="Login Icon"/>
                    </NavLink>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state:AppStateType):MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth
    }
};

export default connect<MapStatePropsType,MapDispatchPropsType,{},AppStateType>(mapStateToProps,{authMe,logOut})(AuthBlock)