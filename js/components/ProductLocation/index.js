import React, { Component } from "react";
import { Platform, TextInput, Alert } from "react-native";
import firebase from 'firebase';


import { Container, Header, Title, Content, Button, Icon, Text, Right, Body, Left, Picker, Form, ListItem, Item as FormItem, Separator } from "native-base";
const Item = Picker.Item;

var temp=''
export default class productLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected1: "37",
      productid:'',
      rackid:''
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected1: value
    });
  }

  oncheck(pid,psize,loc){
   
    console.log(pid,psize,loc);
    var user = firebase.auth().currentUser;
  if (user) {
  // User is signed in.
  
  this.writeUserData(pid,psize,loc)
} else {
  // No user is signed in.
  console.log(error);
}
  var firebaseVal = firebase.database().ref('product_Location/');
    
  firebaseVal.on('value', function(datasnapshot){
    temp = datasnapshot.val();
  })
  console.log(temp);
    Alert.alert('Successfully updated Location')
  }

  writeUserData(pid, psize, loc) {
  // A post entry.
  var postData = {
    ProductID: pid,
    ProductSize: psize,
    Location: loc

  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('UpdateReceived').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
 
  updates['product_Location/' + newPostKey] = postData;

  firebase.database().ref().update(updates);



}

onValidate(){
  if(this.state.rackid && this.state.productid != null)
  {
    return(
                <Button full dark onPress={() => this.oncheck(this.state.productid, this.state.selected1, this.state.rackid)} >
            <Text style={{color: '#FAFAFA'}} >Update Location</Text>
          </Button> )
  }

}



  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Location Update</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        <Separator bordered>
           
          </Separator>
        <ListItem icon>
            
            <Left>
               <Button style={{ backgroundColor: "#4CDA64" }}>
                <Icon name="clipboard" />
              </Button>
              <Text>Product Id</Text>
            </Left>
            <Body>

            <TextInput style={{height: 80}} placeholder='Enter productId'   onChangeText={(productid) => this.setState({productid})}/>
             
          </Body>


          </ListItem> 
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#4CDA64" }}>
                <Icon name="clipboard" />
              </Button>
            </Left>
            <Body>
              <Text>Select Size</Text>
            </Body>
            <Right>

            <Picker
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.selected1}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Item label="34" value="34" />
              <Item label="35" value="35" />
              <Item label="36" value="36" />
              <Item label="37" value="37" />
              <Item label="38" value="38" />
              <Item label="39" value="39" />
              <Item label="40" value="40" />
              <Item label="41" value="41" />
              <Item label="42" value="42" />
            </Picker>
          </Right>

          
          </ListItem> 
          <ListItem icon>
            
            <Left>
              <Text>Enter Rack ID</Text>
            </Left>
            <Body>

            <TextInput style={{height: 80}} placeholder='Enter Rack ID'   onChangeText={(rackid) => this.setState({rackid})}/>
             
          </Body>

          </ListItem>
         
            {this.onValidate()}
        </Content>
      </Container>
    );
  }
}