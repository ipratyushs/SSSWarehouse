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


var result1=[]
var tempo=[]

class missingItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showToast: false,
      data3:[],
      data4:[]
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
 
  

  var firebaseVal1 = firebase.database().ref('incomplete_Order/').child('IC');
    
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

  firebase.database().ref('incomplete_Order/').remove()
  

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
         
             <Text style={styles.titleText}>Missing Item List:</Text>
          {this.state.data3.map((rowData,index) =>
          <Card key={rowData.value.orderCompleted}>

          <CardItem>
              <Left>
                <Button iconLeft transparent>
                  <Icon active name="paper" />
                  <Text style={styles.titleText}>Product ID:{rowData.value.product_id}</Text>

                </Button>
                
              </Left>

            </CardItem>
           
          <CardItem>
              <Left>
                <Button iconLeft transparent>
                  <Icon active name="paper" />
       
                   <Text style={styles.titleText}>Size:{rowData.value.product_size}</Text>
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

export default missingItem;
