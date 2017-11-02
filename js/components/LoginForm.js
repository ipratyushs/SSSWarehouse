import React, { Component } from 'react';
import { Text, Image, StyleSheet, Platform, Dimensions,View, TextInput  } from 'react-native';
import {Content,Container, Button, Separator} from "native-base";
import firebase from 'firebase';
import { Card, CardSection, Input, Spinner } from './common';
import App from '../App';


const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };




  onButtonPress() {
    const { email, password } = this.state;
    console.log('this',email)

    this.setState({ error: '', loading: true });


    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        this.onLoginFail()
      });
      console.log('hello')
  }

  onLoginFail() {
    this.setState({ error: 'Invalid Credentials', loading: false });

  }

  onLoginSuccess() {



    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  var user = firebase.auth().currentUser;

if (user) {
  // User is signed in.
  console.log(user);
     
  var name = user.displayName;
 var  email = user.email;
  var uid = user.uid;
//   // since I can connect from multiple devices or browser tabs, we store each connection instance separately
// // any time that connectionsRef's value is null (i.e. has no children) I am offline
// var myConnectionsRef = firebase.database().ref('users/'+uid).child('connections');

// // stores the timestamp of my last disconnect (the last time I was seen online)
// var lastOnlineRef = firebase.database().ref('users/'+uid).child('lastOnline');

// var connectedRef = firebase.database().ref('.info/connected');
// connectedRef.on('value', function(snap) {
//   if (snap.val() === true) {
//     // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
//     var con = myConnectionsRef.push();

//     // When I disconnect, remove this device
//     con.onDisconnect().remove();

//     // Add this device to my connections list
//     // this value could contain info about the device or a timestamp too
//     con.set(true);



//    var sfd = new Date();

//    var time= dateFormat(sfd,  "dddd, mmmm dS, yyyy, h:MM:ss TT");

//    console.log(time);

//     // When I disconnect, update the last time I was seen online
//     lastOnlineRef.onDisconnect().set(time);
//   }
// });

firebase.database().ref('users/'+uid).child('OC').remove()
this.writeUserData(uid, name, email)
var amOnline =  firebase.database().ref('.info/connected');
var userRef = firebase.database().ref('users/'+uid).child('Status');

amOnline.on('value', function(snapshot) {
  if (snapshot.val()) {
    userRef.onDisconnect().set('☆ offline');
    userRef.set('★ online');
  }
})
document.onIdle = function () {
  userRef.set('☆ idle');
}
document.onAway = function () {
  userRef.set('☄ away');
}
document.onBack = function (isIdle, isAway) {
  userRef.set('★ online');
}

  
} 
    <App/>
  }
 writeUserData(userId, name, email) {
  firebase.database().ref('users/' + userId).update({
    username: name,
    email: email,
  })

 
}

  renderButton() {

    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button full style={{backgroundColor:'#5BECB5'}}  onPress={this.onButtonPress.bind(this)}>
       <Text style={{color:'#14080A', fontSize:25, fontWeight:'normal'}}> LOGIN </Text>
      </Button>
    );
  }

  render() {

    return (
    <Container style={{backgroundColor: '#2B3238'}}>
        

    <View style={{flexDirection: 'column', height: 200, top: 150, padding: 20, backgroundColor: '#2B3238'}}>

     
          <TextInput
        style={{height: 60, borderColor: '#3A4149', borderWidth: 1, backgroundColor:'#3A4149', color:'#EFF2F6', fontSize:20}}
            placeholder="user@gmail.com"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        
              <Separator >
           
          </Separator>
      
          <TextInput
           style={{height: 60, borderColor: '#3A4149', borderWidth: 1, backgroundColor:'#3A4149', color:'#EFF2F6', fontSize:20}}
            secureTextEntry
            placeholder="password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        
          {this.renderButton()}
        
      </View>

      </Container>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },

  drawerImage: {
    position: "absolute",
    // left: (Platform.OS === 'android') ? 30 : 40,
    left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
    // top: (Platform.OS === 'android') ? 45 : 55,
    top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
    width: 210,
    height: 75,
    resizeMode: "cover"
  }
};

export default LoginForm;
