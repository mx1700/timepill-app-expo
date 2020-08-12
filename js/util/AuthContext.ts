import React from 'react';

const AuthContext = React.createContext({
    isLogin: false,
    setLogin: (success: Boolean) => {},
});

export default AuthContext