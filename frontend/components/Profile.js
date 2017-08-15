import React from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import Header from './Header';
import Icon from 'react-native-vector-icons/MaterialIcons'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5f7ff',
    height: Dimensions.get('window').height
  }
})


export default class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    tabBarLabel: 'My Profile',
    tabBarIcon: () => (<Icon size={24} color="white" name="account-circle" />)
  };

  componentWillMount = () => {
    console.log('Profile', Dimensions.get('window').width)
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title={'My TuneBud Profile'} />
        <ScrollView>
          <Text style={{fontSize:16}}>Scroll me plz</Text>
        </ScrollView>
      </View>

    )
  }
}
