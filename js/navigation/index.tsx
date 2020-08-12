import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native-appearance';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import UserScreen from "../screens/UserScreen";
// @ts-ignore
import LoginScreen from "../screens/LoginScreen"
// @ts-ignore
import AuthScreen from "../screens/AuthScreen"
import {useContext, useState} from "react";
// @ts-ignore
import Token from '../util/token'
import {AuthContext} from "../util/AuthContext";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

/**
 * 根导航器,需要注册所有页面到这里
 * 且页面名称需要添加到 RootStackParamList 内
 * 且在 LinkingConfiguration 内注册路由
 * @constructor
 */
function RootNavigator() {
  const authContext = useContext(AuthContext)
  return (
    <Stack.Navigator>
      {authContext.isLogin ? (
        <>
          <Stack.Screen name="Root" component={BottomTabNavigator} options={{headerShown: false}}/>
          <Stack.Screen name="User" component={UserScreen} options={{title: 'My home'}} initialParams={{id: "0"}}/>
          <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
        </>
      ):(
        <Stack.Screen name="Login" component={AuthScreen} options={{headerShown: false}}/>
      )}
    </Stack.Navigator>
  );
}
