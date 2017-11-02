import React, { Component } from "react";
import { Image, View, StatusBar } from "react-native";

import { Container, Button, H3, Text, Header, Title, Body, Left, Right } from "native-base";

import styles from "./styles";
import firebase from 'firebase';


const launchscreenBg = require("../../../img/giphy.gif");


class Home extends Component {
	// eslint-disable-line

	onclick(){
		this.props.navigation.navigate("DrawerOpen")
		 var user = firebase.auth().currentUser;
              if (user) {
              // User is signed in.
              var uid = user.uid;
            } else {
              // No user is signed in.
              console.log(error);
            }

        

	}

	render() {
		return (
			<Container>
				<StatusBar barStyle="light-content" />
				<Image source={launchscreenBg} style={styles.imageContainer}>
					<View
						style={{
							alignItems: "center",
							marginBottom: 50,
							backgroundColor: "transparent",
						}}
					>
						
					</View>
					<View style={{ marginBottom: 90 }}>
						<Button
							style={{ backgroundColor: "#6FAF98", alignSelf: "center" }}
							onPress={() => this.onclick()}
						>
							<Text>Lets Go!</Text>
						</Button>
					</View>
				</Image>
			</Container>
		);
	}
}

export default Home;
