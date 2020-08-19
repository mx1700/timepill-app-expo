import React from 'react';

const UserContext = React.createContext({
    user: null,
    isSelf: false,
});

export default UserContext