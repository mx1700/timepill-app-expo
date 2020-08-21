import React, {Component, useMemo} from 'react';
import FollowDiaryData from "../dataLoader/followDiaryData";
import {Container} from "../components/Themed";
import DiaryList from '../components/diary/diaryList';
import {useScrollToTop} from "@react-navigation/native";

export default function FollowScreen({ navigation }) {
  const ref = React.useRef(null);
  useScrollToTop(ref);

  const dataSource = useMemo(() => {
    return new FollowDiaryData();
  }, []);

  return (
    <Container>
      <DiaryList scrollRef={ref}
                 dataSource={dataSource}
      />
    </Container>
  )
}