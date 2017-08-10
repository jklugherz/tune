import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Login from './frontend/components/Login';
import Protected from './frontend/components/Protected';

export default StackNavigator({
  Login: {
    screen: Login
  },
  Protected: {
    screen: Protected
  }
}, {initialRouteName: 'Login'});
