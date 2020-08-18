import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Avatar} from "react-native-elements";


export default function UserIcon(props) {
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
}