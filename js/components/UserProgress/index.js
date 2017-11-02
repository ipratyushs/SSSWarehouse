import React, { Component } from "react";
import firebase from "firebase";

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

class userProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showToast: false,
      data:[],
      data2:[],
      temp:[],
      temp2:[],
      result:[]

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
 
  var firebaseVal = firebase.database().ref('users/'+uid).child('OC');

    
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
}

 onSendProgress(count){
  var user = firebase.auth().currentUser;
  if (user) {
  // User is signed in.
  var uid = user.uid;
  var uemail = user.email;
  this.writeProgressData(uid,uemail,count)
} else {
  // No user is signed in.
  console.log(error);
}
  


  

 }

writeProgressData(userId, email, count) {
  firebase.database().ref('user_Progress/' + userId).set({
    email: email,
    orders_completed:count
  })


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
          <Button full info
            onPress={() =>
             this.orderval()}
          >
            <Text style={styles.titleText}>Double Click to Check Status</Text>
          </Button>
           <Button full primary
            onPress={() =>
             this.onSendProgress(this.state.data2)}
          >
            <Text style={styles.titleText}>Send Progress to Admin</Text>
          </Button>
         <Card>
           <CardItem>
            <Left>
                <Button iconLeft transparent>
                  <Icon active name="flag" />
                  <Text style={styles.titleText}>Total  Orders Completed:{this.state.data2}</Text>
                </Button>
              </Left>
            </CardItem>
          
             
          </Card>
          <Text style={styles.titleText}>Completed Order List:</Text>
          {this.state.data.map((rowData,index) =>
          <Card key={rowData.value.orderCompleted}>

          <CardItem>
              <Left>
                <Button iconLeft transparent>
                  <Icon active name="paper" />
                  <Text style={styles.titleText}>Order Number :{rowData.value.orderCompleted}</Text>
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

export default userProgress;
