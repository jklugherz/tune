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
import axios from 'axios';
import { SearchBar, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5f7ff',
    height: Dimensions.get('window').height,
    alignItems: 'center',
    flexDirection: 'column'
  },
  innerContainer: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 10,
    width: Dimensions.get('window').width * .9,
    margin: 10
  },
  searchStyle: {
    margin: 10
  },
  searchTitle: {
    alignSelf: 'center',
    fontWeight: '400',
    fontSize: 16,
    marginTop: 10
  }
})

export default class SongForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song: ''
    }
  }

  static navigationOptions = {
    tabBarLabel: 'Send a Song',
    tabBarIcon: () => (<Icon size={24} color="white" name="send" />)
  };


  onFormSubmit = () => {
    axios.get(`https://api.spotify.com/v1/search?q=${this.song}`)
    .then((response) => {
      if (response.data.success) {
        console.log(response)
      }
    })
    .catch((err) => {
      console.log('error', err)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title={'Send a song'} />
        <ScrollView>
          <View style={styles.innerContainer}>
            <Text style={styles.searchTitle}>Search for a song: </Text>
            <SearchBar
              round={true}
              lightTheme
              containerStyle={styles.searchStyle}
              onChangeText={(text) => this.setState({ song: text})}
              placeholder='Search by song title...' />
          </View>
          <Button
            raised
            title='Submit'
            backgroundColor='#648f00'
            buttonStyle={{ marginTop: 10, width: Dimensions.get('window').width * .8, alignSelf: 'center' }}
            onPress={() => this.onFormSubmit()}
          />
        </ScrollView>
      </View>
    )
  }
}
