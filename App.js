import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import PlaceHolder from './frontend/components/placeHolderComponent';

export default StackNavigator({
  PlaceHolder: {
    screen: PlaceHolder
  }
}, {initialRouteName: 'PlaceHolder'});
