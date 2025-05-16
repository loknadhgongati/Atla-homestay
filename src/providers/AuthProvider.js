import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from 'actions';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';

const { createContext, useContext } = React;

const AuthContext = createContext(null);

const AuthBaseProvider = ({ children, dispatch }) => {
  const getToken = () => {
    return localStorage.getItem('bwm_token');
  };

  const decodeToken = token => {
    try {
      return jwtDecode(token);
    } catch (err) {
      return null;
    }
  };

  const getExpiration = decodedToken => {
    if (!decodedToken || !decodedToken.exp) return moment().subtract(1, 'hour');
    return moment.unix(decodedToken.exp);
  };

  const isTokenValid = decodedToken => {
    return decodedToken && moment().isBefore(getExpiration(decodedToken));
  };

  const isAuthenticated = () => {
    const decodedToken = decodeToken(getToken());
    return decodedToken && isTokenValid(decodedToken)
  };


  const signIn = loginData => {
    return loginUser(loginData).then(token => {
      localStorage.setItem('bwm_token', token);
      const decodedToken = decodeToken(token);
      dispatch({
        type: 'USER_AUTHENTICATED',
        username: decodedToken?.username || ''
      });
      return token;
    });
  };

  const signOut = () => {
    localStorage.removeItem('bwm_token');
    dispatch({ type: 'USER_SIGNED_OUT' });
  };

  const signUp = (userData) => {
    return fetch('/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    }).then(async res => {
      if (!res.ok) {
        const errorData = await res.json();
        return Promise.reject(errorData.errors || ['Registration failed']);
      }
      return res.json();
    });
  };

  const checkAuthState = () => {
    const token = getToken();
    const decodedToken = decodeToken(token);

    if (token && isTokenValid(decodedToken)) {
      dispatch({
        type: 'USER_AUTHENTICATED',
        username: decodedToken?.username || ''
      });
    } else {
      signOut(); // auto-sign out if token is invalid/expired
    }
  };

  const authApi = {
    signIn,
    signOut,
    signUp,
    isAuthenticated,
    checkAuthState
  };

  return <AuthContext.Provider value={authApi}>{children}</AuthContext.Provider>;
};

export const AuthProvider = connect()(AuthBaseProvider);

export const useAuth = () => useContext(AuthContext);

export const withAuth = Component => props => (
  <AuthContext.Consumer>
    {authApi => <Component {...props} auth={authApi} />}
  </AuthContext.Consumer>
);
