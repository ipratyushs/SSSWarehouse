import React, { Component } from "react";
import { Platform, TextInput, Alert, StyleSheet } from "react-native";
import firebase from 'firebase';
import { Container, Header, Title, Content, Button, Icon, Text, Right, Body, Left, Picker, Form, ListItem, Item as FormItem, Separator } from "native-base";
const Item = Picker.Item;

var temp=''
var result=[]
export default class searchOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderid:'',
      locdata:[]
    };
  }


 oncheck(){
      //FIREBASE API

            var user = firebase.auth().currentUser;
              if (user) {
              // User is signed in.
              var uid = user.uid;
            } else {
              // No user is signed in.
              console.log(error);
            }
             
              var firebaseVal = firebase.database().ref('OrdersCompleted/');

                
              firebaseVal.on('value', function(datasnapshot){
                temp = datasnapshot.toJSON();
               

               
              })
              console.log(temp);
              result = _.map(temp, function(value,prop){
              return {prop:prop, value:value}
              })
                this.setState({
                  locdata:result
                })
              console.log(result);


  }



onrender(itemid){

  return this.state.locdata.map((lockd,index) =>{

   
      if(lockd.value.orderid == itemid )
                 {  return(
               <Left>
                  <Text style={styless.titleText}>User email:{lockd.value.email}</Text>
               </Left>) 

      }


      
    })
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
            <Title>Order Packager Finder</Title>
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
              <Text>Order Id</Text>
            </Left>
            <Body>

            <TextInput style={{height: 80, fontSize: 20, fontWeight: 'bold'}} placeholder='Enter ORDER ID'   onChangeText={(orderid) => this.setState({orderid})}/>
             
          </Body>


          </ListItem> 
          <ListItem icon>
          
          

                 {this.onrender(this.state.orderid)}
           
          

          
          </ListItem> 
          
          <Button full dark onPress={() => this.oncheck()} >
            <Text style={{color: '#FAFAFA'}} >SYNC</Text>
          </Button> 
        </Content>
      </Container>
    );
  }
}


const styless = StyleSheet.create({
  titleText: {

    fontSize: 20,
    fontWeight: 'normal',
  },
  contain: {
    width: 350,
    height: 200
  },
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
});