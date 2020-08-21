import React, {Component, useContext, useEffect, useLayoutEffect} from 'react';
import {StyleSheet, Animated, DeviceEventEmitter, Alert} from 'react-native';
import {View, Text, Button, Container, Ionicons, HeadIcon} from '../../components/Themed';
import Api from '../../util/api';

import UserIntro from './userIntro';
import DiaryList from '../../components/diary/diaryList'
import UserContext from './UserContext'
import useApi from '../../hooks/useApi';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserDiaryData from "../../dataLoader/userDiaryData";
import NotebookList from "../../components/notebook/notebookList";

const Tab = createMaterialTopTabNavigator();

export function UserScreen(props) {
  const uid = props.id || props.route.params.id;
  const {navigation} = props;

  const [loading, error, user] = useApi(Api.getUserInfo, uid);
  const [relLoading, relError, rel] = useApi(Api.getRelation, uid);

  useLayoutEffect(() => {
    if(user) {
      navigation.setOptions({ title: user.name })
    }
  }, [user])

  useLayoutEffect(() => {
    console.log('relation', rel, typeof rel)
    if(relLoading && !relError) {
      navigation.setOptions({
        headerRight: () => (
          <HeadIcon name={"md-settings"} onPress={() => {console.log('111222')}} />
        ),
      });
    }
  }, [relLoading, relError, rel])

  return <UserTab user={user} isSelf={false} loading={loading} error={error} />
}

export function MyScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeadIcon name={"md-settings"} onPress={() => {console.log('111222')}} />
      ),
    });
  }, [navigation]);

  const [loading, error, user] = useApi(Api.getSelfInfoByStore);
  return <UserTab user={user} isSelf={true} loading={loading} error={error} />
}

function UserTab(props) {
  const {user, isSelf, loading, error} = props;
  const userContext = React.useMemo(
    () => {
      console.log("MyScreen useMemo")
      return {
        user: user,
        isSelf: isSelf,
      }
    },
    [user]
  );
  if (loading) {
    return null
  }

  if (error) {
    return <Text>error: {error}</Text>
  }

  return (
      <UserContext.Provider value={userContext}>
        <Tab.Navigator backBehavior={"none"} style={{flex: 1, height: 1}}>
          <Tab.Screen name="Intro" component={Intro}
                      options={{tabBarLabel: '简介'}}/>
          <Tab.Screen name="Diary" component={UserDiaries}
                      options={{tabBarLabel: '日记'}}/>
          <Tab.Screen name="Notebook" component={UserNotebooks}
                      options={{tabBarLabel: '日记本'}}/>
        </Tab.Navigator>
      </UserContext.Provider>
  );
}

function Intro() {
  const {user} = useContext(UserContext);
  return <UserIntro user={user}/>
}

function UserDiaries() {
  const {user, isSelf} = useContext(UserContext);
  const dataSource = React.useMemo(
    () => {
      console.log("MyDiaries useMemo")
      return new UserDiaryData(user.id)
    },
    []
  );

  return (<DiaryList
    dataSource={dataSource}
    showField={['subject', 'createdTime']}
    isMine={isSelf}
  />)
}

function UserNotebooks(props) {
  const {user, isSelf} = useContext(UserContext);
  return (isSelf ? <NotebookList /> : <NotebookList user={user} />);
}