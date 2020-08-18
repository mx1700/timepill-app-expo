import * as React from 'react';
import {StyleSheet} from 'react-native';
import { Text, Container } from '../components/Themed';

export default function DiaryScreen() {
  return (
    <Container style={styles.container}>
      <Text style={styles.title}>Tab One 你好</Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
