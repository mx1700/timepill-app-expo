import {Ionicons} from '@expo/vector-icons';
import {BottomTabNavigationProp, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
// @ts-ignore
import HomeScreen from '../screens/HomeScreen';
// @ts-ignore
import {MyScreen} from '../screens/UserScreen';
// @ts-ignore
import FollowScreen from '../screens/FollowScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import {
  BottomTabParamList,
  FollowParamList,
  HomeParamList,
  MyParamList,
  TabTwoParamList
} from '../types';
import {View} from "react-native";


const BottomTab = createBottomTabNavigator<BottomTabParamList>();
// createMaterialBottomTabNavigator android 上切换会闪烁
// const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        showLabel: false
      }}
      lazy={false}
      // activeColor={Colors[colorScheme].tint}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: "首页",
          tabBarIcon: ({color}) => <TabBarIcon name="ios-home" color={color}/>,
        }}
      />
      <BottomTab.Screen
        name="Follow"
        component={TabOneNavigator}
        options={{
          tabBarLabel: "关注",
          tabBarIcon: ({color}) => <TabBarIcon name="ios-heart" color={color}/>,
        }}
      />
      <BottomTab.Screen
        name="Write"
        component={WriteView}
        options={{
          tabBarLabel: "写日记",
          tabBarIcon: ({color}) => <TabBarIcon name="ios-create" color={color}/>,
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({color}) => <TabBarIcon name="ios-notifications" color={color}/>,
        }}
      />
      <BottomTab.Screen
        name="My"
        component={MyNavigator}
        options={{
          tabBarLabel: "我的",
          tabBarIcon: ({color}) => <TabBarIcon name="ios-contact" color={color}/>,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={26} style={{marginBottom: -3}} {...props} />;
}

function WriteView({ navigation }: any) {
  React.useEffect(() => {
    console.log("tabbar useEffect")
    const current = navigation;
    const unsubscribe = current.addListener('tabPress', (e: any) => {
      // Prevent default behavior
      e.preventDefault();
      console.log("tabbar tabPress")
      // Do something manually
      // ...

      navigation.push("Write");
    });

    return unsubscribe;
  }, [navigation]);

  return <View/>
}

const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerTitle: '首页'}}
      />
    </HomeStack.Navigator>
  );
}

const MyStack = createStackNavigator<MyParamList>();

function MyNavigator() {
  return (
    <MyStack.Navigator>
      <MyStack.Screen
        name="MyScreen"
        component={MyScreen}
        options={{headerTitle: '我的'}}
      />
    </MyStack.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<FollowParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="FollowScreen"
        component={FollowScreen}
        options={{headerTitle: '关注'}}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{headerTitle: 'Tab Two Title'}}
      />
    </TabTwoStack.Navigator>
  );
}
