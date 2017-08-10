import React from 'react';
import { Text, View, TouchableOpacity, Linking, Image, Button, TouchableHighlight, StyleSheet } from 'react-native';
import { WebBrowser, Constants } from 'expo';
import Protected from './Protected';
const url = process.env.EXPO_URI;


const pageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5f7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: url
    };
  }

  static navigationOptions = {
      title: 'Login'
  };

  render() {
    return (
      <View style={pageStyles.container}>
        <View>
          <Image
            source={require('../../assets/icons/tuneapp.png')}
            style={{width: 100, height: 100}}
          />
        </View>
        <TouchableHighlight onPress={() => {this._openWebBrowserAsync()}}>
          <Image
            source={require('../../assets/icons/log_in-mobile.png')}
            style={{width: 200, resizeMode: 'contain', height: 200}}
          />
        </TouchableHighlight>
      </View>
    );
  }

  _openWebBrowserAsync = async () => {
    Linking.addEventListener('url', this._handleRedirect);
    let result = await WebBrowser.openBrowserAsync(
      `http://localhost:3000/auth/login`
    );
    console.log('result', result);
    Linking.removeEventListener('url', this._handleRedirect);
  }

  _handleRedirect = (event) => {
    WebBrowser.dismissBrowser();
    console.log('event', event);
    this.setState({event: event.url});
    if (this.state.event.split('?').length > 1) {
      const { navigate } = this.props.navigation;
      navigate('SideMenu', {userId: this.state.event.split('?')[1]})
    }
  }
};
