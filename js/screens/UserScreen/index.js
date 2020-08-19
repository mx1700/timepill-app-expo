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
import UserDiaryData from "../../dataLoader/userDiaryData";
import NotebookList from "../../components/notebook/notebookList";

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
          <Tab.Screen name="Intro" component={() => <UserIntro user={user}/>}
                      options={{ tabBarLabel: '简介' }} />
          <Tab.Screen name="Diary" component={() => <MyDiaries user={user}/>}
                      options={{ tabBarLabel: '日记' }} />
          <Tab.Screen name="Notebook" component={() => <MyNotebooks user={user}/>}
                      options={{ tabBarLabel: '日记本' }} />
      </Tab.Navigator>
    );
    // return (<Text>login: {user.name}</Text>);
}

function MyDiaries(props) {
    console.log("MyDiaries", props);
    const user = props.user;
    const dataSource = React.useMemo(
      () => new UserDiaryData(user.id),
      [user.id]
    );

    return (<DiaryList
      dataSource={dataSource}
      showField={['subject', 'createdTime']}
      isMine={true}
    />)
}

function MyNotebooks(props) {
    console.log("MyNotebooks", props);
    const user = props.user;
    return (<NotebookList
      user={user}
    />);
}