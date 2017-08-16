import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';


const styles = StyleSheet.create({
  headerBox: {
    width: Dimensions.get('window').width,
    height: 70,
    backgroundColor: '#6759BF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
})


export default class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.headerBox}>
        <Text style={styles.headerText}>{this.props.title}</Text>
      </View>
    )
  }
}
