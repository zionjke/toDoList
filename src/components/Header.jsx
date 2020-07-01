import React from 'react'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {authMe, logOut} from "../redux/authReducer";


class Header extends React.Component {

    componentDidMount() {
        this.props.authMe()
    }

    onLogOutClick = () => {
        this.props.logOut()
    };

    render() {
        const {isAuth,userInfo} = this.props;
        return (
            <div>
                {isAuth && <div>{userInfo.login} - <span onClick={this.onLogOutClick}>Log Out</span></div>}
                {!isAuth && <div>
                    <NavLink to='/login'>Sign In</NavLink>
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

export default connect(mapStateToProps,{authMe,logOut})(Header)