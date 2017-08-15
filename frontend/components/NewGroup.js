import React from 'react';
import { Text, View, TouchableOpacity, Linking, Button, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from './Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#e5f7ff',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    alignSelf: 'stretch'
  },
  input: {
    height: 40,
    alignSelf: 'center',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    margin: 10
  },
  title: {
    fontSize: 15,
    textAlign: 'center',
    padding: 10,
    margin: 10,
  },
  peopleContainer: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignSelf: 'stretch',
    margin: 10
  },
  avatarContainer: {
    margin: 10,
    flexDirection: 'row'
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  name: {
    left: 20,
    top: 10,
    fontSize: 20,
    fontWeight: '400',
  },
});


export default class NewGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: this.props.navigation.state.params.userId,
      allUsers: [],
      groupName: '',
      groupMembers: []
    }
  };

  static navigationOptions = {
    tabBarLabel: 'Create a Group',
    tabBarIcon: () => (<Icon size={24} color="white" name="people" />)
  };

  componentWillMount() {
    axios.get('http://localhost:3000/groups/users')
    .then((response) => {
      this.setState({
        allUsers: response.data.users
      })
    })
    .catch((err) => {
      console.log('error', err);
    })
  }


  displayAllUsers = () => {
    //first, find and remove current User from the allUsers array.
    let usersArray = this.state.allUsers;
    usersArray.forEach((user, index) => {
      if (user._id === this.state.currentUserId) {
        usersArray.splice(index, 1);
      }
    })

    this.setState({
      allUsers: usersArray
    })

    return this.state.allUsers.map((user) => {
      return (
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{uri: user.imageURL}}
        />
        <Text style={styles.name}>{user.username}</Text>
        {/* check box  */}
      </View>
    )})
  }

  onFormSubmit = () => {

  }


  render() {
    return (
      <View style={styles.container}>
        <Header title={'Create a New Group'} />
        <ScrollView>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Group name: </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter a group name..."
              onChangeText={(text) => {this.setState({groupName: text})}}
            />
          </View>
          <View style={styles.peopleContainer}>
            <Text style={{ margin: 10 }}>Check group members: </Text>
            {this.displayAllUsers()}
          </View>
        </ScrollView>
      </View>
    )
  }

};
