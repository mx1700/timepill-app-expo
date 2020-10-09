import React, {Component, useMemo} from 'react';
import FollowDiaryData from "../dataLoader/followDiaryData";
import {Container} from "../components/Themed";
import DiaryList from '../components/diary/diaryList';
import {useScrollToTop} from "@react-navigation/native";
import {Text} from "react-native";

export default function WriteScreen({ navigation }) {

  return (
    <Container>
      <Text>Hello world</Text>
    </Container>
  )
}