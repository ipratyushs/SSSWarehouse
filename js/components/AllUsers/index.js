import React, { Component } from "react";
import firebase from "firebase";
import {View, Alert} from 'react-native';

import {
  Container,
  Header,
  Title,
  Content,
  Text,
  H3,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Toast,
  Card,
  CardItem
} from "native-base";


import styles from "./styles";

var temp=[]
var temp2=[]
var result=[]
var result1=[]
var tempo=[]

class allUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showToast: false,
      data:[],
      data2:[],
      data3:[]
    };
  }
  orderval(){
  var user = firebase.auth().currentUser;
  if (user) {
  // User is signed in.
  var uid = user.uid;
} else {
  // No user is signed in.
  console.log(error);
}
 
  var firebaseVal = firebase.database().ref('/users/');

    
  firebaseVal.on('value', function(datasnapshot){
    temp = datasnapshot.toJSON();
    temp2 = datasnapshot.numChildren();

   
  })
  console.log(temp);
  result = _.map(temp, function(value,prop){
  return {prop:prop, value:value}
  })
    this.setState({
      data:result
    })
  console.log(result);


  this.setState({
      
      data2:temp2
    });

  var firebaseVal1 = firebase.database().ref('user_Progress/');
    
  firebaseVal1.on('value', function(datasnapshot){
    tempo = datasnapshot.val();
  })


  console.log(tempo);

  result1 = _.map(tempo, function(value,prop){
  return {prop:prop, value:value}
  })
    this.setState({
      data3:result1
    })
  console.log(result1);



}

cleanDatabase(){

  firebase.database().ref('user_Progress/').remove()


  Alert.alert('Database Cleaned!')
}






  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Progress Check</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
        <Left>
          <Button full dark
            onPress={() =>
             this.orderval()}
          > 
            <Text style={styles.titleText}>GET</Text>
          </Button>
         </Left>
         <Right>
          <Button full light
            onPress={() =>
             this.cleanDatabase()}
          
          >
            <Text style={styles.titleText}>CLEAN</Text>
          </Button>
         </Right> 
        </View> 
          <Text style={styles.titleText}>Users Active:</Text>
          {this.state.data.map((rowData,index) =>
          <Card key={rowData.value.orderCompleted}>

          <CardItem>
              <Left>
                <Button iconLeft transparent>
                  <Icon active name="paper" />
                  <Text style={styles.titleText}>Email:{rowData.value.email}</Text>

                </Button>
                
              </Left>

            </CardItem>
           
          <CardItem>
              <Left>
                <Button iconLeft transparent>
                  <Icon active name="paper" />
                 
              <Text style={styles.titleText}>Status:{rowData.value.Status}</Text>
                </Button>
                
              </Left>

            </CardItem>
          </Card>
          )}


             <Text style={styles.titleText}>Users OrderCompletion:</Text>
          {this.state.data3.map((rowData,index) =>
          <Card key={rowData.value.orderCompleted}>

          <CardItem>
              <Left>
                <Button iconLeft transparent>
                  <Icon active name="paper" />
                  <Text style={styles.titleText}>Email:{rowData.value.email}</Text>

                </Button>
                
              </Left>

            </CardItem>
           
          <CardItem>
              <Left>
                <Button iconLeft transparent>
                  <Icon active name="paper" />
       
                   <Text style={styles.titleText}>Orders Completed:{rowData.value.orders_completed}</Text>
                </Button>
                
              </Left>

            </CardItem>
          </Card>
          )}

        </Content>
      </Container>

    );
  }
}

export default allUsers;
