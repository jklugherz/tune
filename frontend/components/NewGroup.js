import React from 'react';
import { Text, View, TouchableOpacity, Linking, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 20,
    padding: 10,
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#e5f7ff',
    paddingTop: 30,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  formText: {
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default class NewGroup extends React.Component {
  constructor(props) {
    super(props);
  };

  static navigationOptions = {
      title: 'Create Group'
  };

  onFormSubmit = () => {

  }



  render() {
    console.log(this.props.navigation.state.params.userId);
    return (
      <View style={styles.container}>
        <Text style={styles.formText}>~~Protected~~</Text>
      </View>
    )
  }

};
