import React from 'react';
import {Avatar} from "react-native-elements";


export default React.memo(function UserIcon(props) {
    const {iconUrl, style, ...otherProps} = props
    return (
      <Avatar
        rounded
        {...otherProps}
        containerStyle={style}
        size={props.width || 40}
        source={{uri: iconUrl}}
        activeOpacity={0.7}
      />
    );
});