import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './frontend/components/Login';

export default StackNavigator({
  Login: {
    screen: Login
  }
}, {initialRouteName: 'Login'});
