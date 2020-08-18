import React, {Component} from 'react';
import {StyleSheet, Animated, DeviceEventEmitter, Alert} from 'react-native';
import {View, Text, Button} from '../components/Themed';


import Msg from '../util/msg';
import Api from '../util/api';
// import {Icon} from '../style/icon';
import Event from "../util/event";
import Color from '../constants/Colors';

// import UserIntro from '../components/userIntro';
// import UserDiaryData from '../dataLoader/userDiaryData';
// import DiaryList from '../components/diary/diaryList';
// import NotebookList from '../components/notebook/notebookList';

import useApi from '../hooks/useApi';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function UserScreen() {
    const [loading, error, user] = useApi(Api.getSelfInfoByStore);

    if(loading) {
        return <Text>loading</Text>
    }

    if(error) {
        return <Text>error: {error}</Text>
    }

    return (<Text>login: {user.name}</Text>);
    // return (
    //   <Tab.Navigator>
    //       <Tab.Screen name="Home" component={HomeScreen} />
    //       <Tab.Screen name="Settings" component={SettingsScreen} />
    //   </Tab.Navigator>
    // );
}