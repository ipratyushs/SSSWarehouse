/* @flow */

import React,{Component} from "react";

import { Platform } from "react-native";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import Drawer from "./Drawer";




const AppNavigator = StackNavigator(
    {
        Drawer: { screen: Drawer }

      
    },
    {
        initialRouteName: "Drawer",
        headerMode: "none",
    }
);

export default class App extends Component{
     constructor(props){
    super(props);
    this.state = { loggedIn: false };
  }

  componentWillMount() {
    firebase.initializeApp({
   apiKey: "**********************", // add the api key from the firebase console
    authDomain: "ssswarehouse-f2c8f.firebaseapp.com",
    databaseURL: "https://ssswarehouse-f2c8f.firebaseio.com",
    projectId: "ssswarehouse-f2c8f",
    storageBucket: "",
    messagingSenderId: "*******" // add the messaging SenderID from the firebase console
    });

  var database = firebase.database();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <AppNavigator/>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }
    render(){
        return(

            <Root>
                {this.renderContent()}
            </Root>
        )
    }
}

