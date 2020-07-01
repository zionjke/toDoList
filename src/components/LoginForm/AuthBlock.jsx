import React from 'react'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {authMe, logOut} from "../../redux/authReducer";
import loginIcon from '../../assets/img/login.png'
import './AuthBlock.scss'
import logOutIcon from './../../assets/img/log-out.png'


class AuthBlock extends React.Component {

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

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        userInfo: state.auth.userInfo
    }
};

export default connect(mapStateToProps,{authMe,logOut})(AuthBlock)