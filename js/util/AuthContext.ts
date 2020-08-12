import React from 'react';

export const AuthContext = React.createContext({
    isLogin: false,
    setLogin: (success: Boolean) => {},
});