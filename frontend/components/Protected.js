import React from 'react';
import { Text, View, TouchableOpacity, Linking, Button } from 'react-native';
import axios from 'axios';
import styles from '../styles/pageStyles';

export default class Protected extends React.Component {
  constructor(props) {
    super(props);
  };

  static navigationOptions = {
      title: 'Protected'
  };



  render() {
    return (
      <View style={styles.container}>
        <Text>~~Protected~~</Text>
        <Button
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
          title="Open drawer"
        />
      </View>
    )
  }

};
