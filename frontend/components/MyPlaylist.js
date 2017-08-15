import React from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import Header from './Header';
import Icon from 'react-native-vector-icons/MaterialIcons'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5f7ff',
    height: Dimensions.get('window').height
  }
})

export default class MyPlaylist extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    tabBarLabel: 'My Playlist',
    tabBarIcon: () => (<Icon size={24} color="white" name="music-note" />)
  };


  render() {
    return (
      <View style={styles.container}>
        <Header title={'My TuneBud Playlist'} />
        <ScrollView>
          <Text style={{fontSize:16}}>Scroll me plz</Text>
        </ScrollView>
      </View>
    )
  }
}
