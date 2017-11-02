import React, { Component } from "react";
import { Image } from "react-native";
import firebase from "firebase";
import {
	Content,
	Text,
	List,
	ListItem,
	Icon,
	Container,
	Left,
	Right,
	Badge,
	Button,
	View,
	StyleProvider,
	getTheme,
	variables,
} from "native-base";

import styles from "./style";

const drawerCover = require("../../../img/cover.png");

const drawerImage = require("../../../img/sss.jpg");

const datas = [
	
	{
		name: "Today's Orders",
		route: "todayOrders",
		icon: "menu",
		bg: "#0A2C6B",
		types: "1",
	},
	{
		name: "Previous Orders",
		route: "previousOrders",
		icon: "checkmark-circle",
		bg: "#EB6B23",
	},
	
	{
		name: "Progress",
		route: "userProgress",
		icon: "albums",
		bg: "#C5F442",
	},
	
	{
		name: "Users",
		route: "allUsers",
		icon: "image",
		bg: "#cc0000",
		
	},
	{
		name: "Product Location",
		route: "productLocation",
		icon: "navigate",
		bg: "#BE6F50",
	},
	{
		name: "Search Order",
		route: "searchOrder",
		icon: "search",
		bg: "#29783B",
	},

	{
		name: "Missing Item",
		route: "missingItem",
		icon: "radio-button-on",
		bg: "#6FEA90",
	}
];

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shadowOffsetWidth: 1,
			shadowRadius: 4,
			
		};
	}
	componentWillMount(){
		firebase.auth().onAuthStateChanged((user)=>{
						if(user){
							this.setState({name: user.email})
						}
						console.log(this.state.name)
					})
	}
	_handlePress(){
		firebase.auth().signOut().then(function() {
  console.log('Signed Out');
}, function(error) {
  console.error('Sign Out Error', error);
});
	}


	render() {
		return (
			<Container>
				<Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
					<Image source={drawerCover} style={styles.drawerCover}>
						<Image square style={styles.drawerImage} source={drawerImage} />
					</Image>
					<Button full bordered light info onPress={()=>this._handlePress()}><Text>Logout{this.state.name}</Text></Button>
					
					<List
						dataArray={datas}
						renderRow={data =>
							<ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)}>
								<Left>
									<Icon active name={data.icon} style={{ color: "#777", fontSize: 26, width: 30 }} />
									<Text style={styles.text}>
										{data.name}
									</Text>
								</Left>
								
							</ListItem>}
					/>
				</Content>
			</Container>
		);
	}
}

export default SideBar;
