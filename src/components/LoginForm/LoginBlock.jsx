import React from 'react'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {authMe, logOut} from "../../redux/authReducer";
import loginIcon from '../../assets/img/login.png'
import './LoginBlock.scss'


class LoginBlock extends React.Component {

    componentDidMount() {
        this.props.authMe()
    }

    onLogOutClick = () => {
        this.props.logOut()
    };

    render() {
        const {isAuth,userInfo} = this.props;
        return (
            <div className='login__block'>
                {isAuth && <div>{userInfo.login} - <span onClick={this.onLogOutClick}>Log Out</span></div>}
                {!isAuth && <div>
                    <NavLink to='/login'>
                        <img src={loginIcon} alt=""/>
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

export default connect(mapStateToProps,{authMe,logOut})(LoginBlock)