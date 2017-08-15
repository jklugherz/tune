import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Dimensions }
  from 'react-native';
import { Button } from 'react-native-elements';
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
  input: {
    height: 30,
    alignSelf: 'center',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 10
  },
  title: {
    fontSize: 15,
    textAlign: 'center',
    padding: 10,
    margin: 10,
  },
  stepsContainer: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 10,
    width: Dimensions.get('window').width * .9,
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
  }
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
    .then(() => {
      let usersArray = this.state.allUsers;
      usersArray.forEach((user, index) => {
        if (user._id === this.state.currentUserId) {
          usersArray.splice(index, 1);
        }
      })

      this.setState({
        allUsers: usersArray
      })
    })
    .catch((err) => {
      console.log('error', err);
    })
  }

  onPersonClick = (id) => {
    // set background color to be highlighted - user ternary operator?
    const currentGroup = this.state.groupMembers;
    currentGroup.push(id);
    this.setState({
      groupMembers: currentGroup
    })
  }


  displayAllUsers = () => {
    return this.state.allUsers.map((user) => {
      return (
      <TouchableHighlight
        key={user._id}
        underlayColor='#ecf2f5'
        onPress={() => this.onPersonClick(user._id)}
        >
        <View
          style={styles.avatarContainer}
          >
          <Image
            style={styles.avatar}
            source={{uri: user.imageURL}}
          />
          <Text style={styles.name}>{user.username}</Text>
        </View>
      </TouchableHighlight>
    )})
  }

  onFormSubmit = () => {
    console.log(this.state.groupMembers);
    axios.post('http://localhost:3000/groups/create', {
      name: this.state.groupName,
      owner: this.state.currentUserId,
      members: this.state.groupMembers
    })
    .then((response) => {
      if (response.data.success) {
        const { navigate } = this.props.navigation;
        navigate('Profile', {groups: response.data.groups})
      }
    })
    .catch((err) => {
      console.log('error', err)
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <Header title={'Create a New Group'} />
        <ScrollView>
          <View style={styles.stepsContainer}>
            <Text style={styles.title}>1. Enter a group name: </Text>
            <TextInput
              style={styles.input}
              placeholder="Group name...            "
              onChangeText={(text) => {this.setState({groupName: text})}}
            />
          </View>
          <View style={styles.stepsContainer}>
            <Text style={styles.title}>2. Check group members: </Text>
            {this.displayAllUsers()}
          </View>
          <Button
            raised
            title='Submit'
            backgroundColor='#1db954'
            buttonStyle={{ marginTop: 10 }}
            onPress={() => this.onFormSubmit()}
          />
        </ScrollView>
      </View>
    )
  }

};
