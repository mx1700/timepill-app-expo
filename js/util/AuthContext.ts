import React from 'react';

const AuthContext = React.createContext({
    isLogin: false,
    setLogin: (success: boolean) => {},
});

export default AuthContext