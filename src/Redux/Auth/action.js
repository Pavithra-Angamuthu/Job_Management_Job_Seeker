import { LOGIN, NOT_LOGIN } from "./actionTypes";


const login = (data) => {
    const login = (data) => {
        return {
            type: LOGIN,
            details: data
        }
    }
    return (dispatch) => {
        dispatch(login(data));
    }
}


const logout = () => {
    const logout = () => {
        return {
            type: NOT_LOGIN
        }
    }
    return (dispatch) => {
        dispatch(logout());
    }
}



export const AuthActions = {
    login,
    logout
}