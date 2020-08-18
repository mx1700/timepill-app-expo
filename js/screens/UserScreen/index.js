import React, {Component} from 'react';
import {StyleSheet, Animated, DeviceEventEmitter, Alert} from 'react-native';
import {View, Text, Button} from '../../components/Themed';


import Msg from '../../util/msg';
import Api from '../../util/api';
// import {Icon} from '../style/icon';
import Event from "../../util/event";
import Color from '../../constants/Colors';

import UserIntro from './userIntro';
import DiaryList from '../../components/diary/diaryList'
// import UserDiaryData from '../dataLoader/userDiaryData';
// import DiaryList from '../components/diary/diaryList';
// import NotebookList from '../components/notebook/notebookList';

import useApi from '../../hooks/useApi';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export function UserScreen() {
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

export function MyScreen() {
    const [loading, error, user] = useApi(Api.getSelfInfoByStore);

    if(loading) {
        return <Text>loading</Text>
    }

    if(error) {
        return <Text>error: {error}</Text>
    }

    return (
      <Tab.Navigator>
          <Tab.Screen name="Intro" component={UserIntro} initialParams={{user: user}} />
      </Tab.Navigator>
    );
    // return (<Text>login: {user.name}</Text>);
}

function MyDiaries() {
    return (<DiaryList
      {...this.props}

      dataSource={this.dataSource}
      showField={['subject', 'createdTime']}
      isMine={!this.user}
    />)
}