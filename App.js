import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Login from './frontend/components/Login';
import SideMenu from './frontend/components/SideMenu';

export default StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  SideMenu: {
    screen: SideMenu,
    navigationOptions: {
      header: null
    }
  }
}, {initialRouteName: 'Login'});
