import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import TodoList from './jsfile/todo';


export default function App() {
  return (
    <View style={styles.container}>
      <TodoList list={[]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    // alignItems: 'center',
    justifyContent: 'center',
  },

});
