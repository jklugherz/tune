import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  };

  static navigationOptions = {
      title: 'Login'
  };

  loginPress() {
    Linking.openURL('http://localhost:3000/auth/login').catch(err => console.error('An error occurred', err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>~~IDK WHAT TO NAME THIS APP~~</Text>
        <TouchableOpacity onPress={() => {this.loginPress()}}>
          <Text style={styles.buttonLabel}>Tap to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
