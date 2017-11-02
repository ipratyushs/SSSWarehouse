import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, Image, Alert, StatusBar, StyleSheet, TouchableOpacity, TextInput, Switch, AsyncStorage } from 'react-native'; 
import {CheckBox, ListItem, Container, Content,  Header, Left, Right, Button, Icon, Body, Title, Card, CardItem, Thumbnail, Item, Input, List} from 'native-base';
import styles from "./styles";
import { NavigationActions } from 'react-navigation';
import axios from 'axios';
import FormData from 'form-data';
import Storage from 'react-native-storage';
import firebase from 'firebase';
import moment from 'moment';



var temp=''
var temp2=''
var result=[]
const cardImage = require("../../../img/drawer-cover.png");
var form = new FormData();
form.append('webservice_key', 'L14YN7LAVX2CH3RA5M1DDWNFRLLVMA32');
const datas = [
  {
    route: "BasicSegment",
    text: "Click to Open"
  }
];


var storage = new Storage({
          // maximum capacity, default 1000 
          size: 1000000,

          // Use AsyncStorage for RN, or window.localStorage for web.
          // If not set, data would be lost after reload.
          storageBackend: AsyncStorage,
          
          // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
          // can be null, which means never expire.
          defaultExpires: 1000 * 3600 * 24,
          
          // cache data in the memory. default is true.
          enableCache: true,
          
          // if data was not found in storage or expired,
          // the corresponding sync method will be invoked and return 
          // the latest data.
          sync : {
            // we'll talk about the details later.
          }
        })  

export default class todayOrders extends Component {
  constructor(props) {
    super(props);
    this.camera = null;

    this.state = {
      
      data:[],

      locdata:[],
      locdata2:[],
      dummyData:[],
      myValue:[],
      isLoading: true,
      text:'',
      tex:'',
      val:'',
      hello:false,
       rawData: '',
        empty: true,
        error:''
       
     } 
     
     
    }


    //SSS API CALL saving in local storage 
 async componentDidMount() {
     axios.post('') // add api url and key (controller=orderdispatch)
    .then((response) => {


    console.log(response)
   
              storage.save({
            key: 'myKey',   // Note: Do not use underscore("_") in key!
            data: response,
            
            // if not specified, the defaultExpires will be applied instead.
            // if set to null, then it will never expire.
            expires: 1000 * 3600 * 24
          });


          // load
         storage.load({
            key: 'myKey',
            
            // autoSync(default true) means if data not found or expired,
            // then invoke the corresponding sync method
            autoSync: true,
            
            // syncInBackground(default true) means if data expired,
            // return the outdated data first while invoke the sync method.
            // It can be set to false to always return data provided by sync method when expired.(Of course it's slower)
            syncInBackground: true,
            
            // you can pass extra params to sync method
            // see sync example below for example
            syncParams: {
              extraFetchOptions: {
                // blahblah
              },
              someFlag: true,
            },
          }).then(ret => {
                  // found data go to then()
                  console.log(ret);
                  this.onsync(ret.data)
                  this.setState({
                    
                    data: ret.data, 
                    rawData:ret.data

                  });


                }).catch(err => {
                  // any exception including data not found 
                  // goes to catch()
                  console.warn(err.message);
                   this.onNoData()
                  switch (err) {
                      case 'NotFoundError':
                          // TODO;
                          break;
                        case 'ExpiredError':
                            // TODO
                            break;
                  }
                })
               
             


        this.setState({
          
          isLoading: false,
          empty: false,
           value:'',


        },
         function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
         this.setState({
                    empty: true,

                })
      });
}
//When no data is received from the API, error is shown in text 
 onNoData() {
    this.setState({ error: 'No Data Found', loading: false });

  }

 

  // Product location retrieval from firebase 

orderval(){
      //FIREBASE API

            var user = firebase.auth().currentUser;
              if (user) {
              // User is signed in.
              var uid = user.uid;
            } else {
              // No user is signed in.
              console.log(error);
            }
             
              var firebaseVal = firebase.database().ref('product_Location/');

                
              firebaseVal.on('value', function(datasnapshot){
                temp = datasnapshot.toJSON();
                temp2 = datasnapshot.numChildren();

               
              })
              console.log(temp);
              result = _.map(temp, function(value,prop){
              return {prop:prop, value:value}
              })
                this.setState({
                  locdata:result
                })
              console.log(result);


              this.setState({
                  
                  locdata2:temp2
                });
  }

  //filtering order id and rendering the only order id that is to be shown to the user
   filterSearch(text){
        this.setState({text})
        let newData = this.dataFilter(text, this.state.rawData);
        this.setState({
            dummyData:newData,
            isLoaded: true,
            empty: false
        })

    }

    dataFilter(text, response){
        return response.filter(function(item){
            const itemData = item.shipping_number
            const textData = text
            

            // const courierData = item.carrier_name.toUpperCase()
            // const courierTextData = text.toUpperCase()
            if( itemData == textData){
              return item
            }
            // else if(orderData == textData){
            //   return item
            // }
            // else{
            //   return courierData.indexOf(courierTextData) > -1
            // }

        })
    }
  

   // function to complete order and updating status

 oncheck(id){


  var user = firebase.auth().currentUser;
  if (user) {
  // User is signed in.
  var uid = user.uid;
  var uemail = user.email;
  this.writeUserData(uid,id)
  this.writeordersCompleted(uid,uemail,id)
} else {
  // No user is signed in.
  console.log(error);
}
  var firebaseVal = firebase.database().ref('users/'+uid).child('OC');
    
  firebaseVal.on('value', function(datasnapshot){
    temp = datasnapshot.val();
  })
  console.log(temp);


   Alert.alert(
 'Order Completed',
 'Thank You! Lets complete an another order!',
 [
   
   {text: 'OK', onPress: () => this.onValChange() },
   console.log(this.state.text)
 ],
);

 }
//function to clear search order id input
 onValChange(){
 
  var ftext = null

  this.filterSearch(ftext);

 }

//function for confirmation that item is not available
 onProcessIncomplete(id,pname,psize,pid){
Alert.alert(
 'Are you sure!',
 'Check before you update!',
 [
   {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
   {text: 'Yes I am Sure!', onPress: () => this.onIncomplete(id,pname,psize,pid)},
 ],
);

 }

// Function that confirms the item is not available anymore

 onIncomplete(id,pname,psize,pid){
  var user = firebase.auth().currentUser;
  if (user) {
  // User is signed in.
  var uid = user.uid;
  this.writeIncompleteOrderData(id,pid,pname,psize)
} else {
  // No user is signed in.
  console.log(error);
}
  var firebaseVal = firebase.database().ref('incomplete_Order/');
    
  firebaseVal.on('value', function(datasnapshot){
    temp = datasnapshot.val();
  })
  console.log(temp);


  

 }

 // function to update the unavailable item to firebase

writeIncompleteOrderData(id,pid,pname,psize){
 // A post entry.
  var postData = {
    orderid: id,
    product_id: pid,
    product_name: pname,
    product_size: psize
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('Incomplete_Order').push().key;
  var newPostKey2 = firebase.database().ref().child('Incomplete_Order_Total').push().key;
  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  var updates2 ={};


 
  updates['incomplete_Order/' + '/IC/' + newPostKey] = postData;
  updates2[newPostKey2] = postData;

  firebase.database().ref().update(updates);

   var date = moment().format("MMM Do"); 
  firebase.database().ref('/Total_Incomplete_Order/'+ date).update(updates2);
}


// function to update the completed order  to firebase w.r.t the user completing it


writeUserData(uid, id) {
  // A post entry.
  var postData = {
    orderCompleted: id
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('OrdersCompleted').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
 
  updates['users/' + uid + '/OC/' + newPostKey] = postData;

  firebase.database().ref().update(updates);



}

onClear(){

  this.setState({
    text: ''
  })
}


// Updating the completed order to firebase
writeordersCompleted(uid,uemail,id){

  // A post entry.
  var postData = {
    orderid: id,
    email: uemail
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('ordersCompleted').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
 
  updates['OrdersCompleted/' + uid  + newPostKey] = postData;

  firebase.database().ref().update(updates);


}

// rendering the location of the product

onrender(itemid, itemsize){

  return this.state.locdata.map((lockd,index) =>{

   
      if(lockd.value.ProductID == itemid && lockd.value.ProductSize == itemsize)
                 {  return(
               <Right>
                  <Text style={styless.titleText}>Location:{lockd.value.Location}</Text>
               </Right>)
      }
      
    })
}
onRenderPName(pname){
  var productname = pname.length
  console.log(productname);
  var renderPname = pname.slice(0, productname-16)
        return (        <Left>
                    <Button iconLeft transparent>
                      <Icon active name="cart" />
                       <Text style={styless.titleText}>Product Name: {renderPname}</Text>
                  </Button>
                  </Left>)
}

onsync(jsondata){
  var date = moment().format("MMM Do"); 
  firebase.database().ref('/Orders/'+ date).update(jsondata);
}

onIncompleteOrder(oid){
  console.log('Incomplete order', oid);

  Alert.alert(
 'Noted!',
 'Thank You! Lets complete an another order!',
 [
   
   {text: 'OK', onPress: () => this.onValChange() },
   console.log(this.state.text)
 ],
);

}

  render() {


    

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }


    return (
           <Container style={styles.container}>
            <Header hasTabs>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
          <Title>Orders</Title>
          </Body> 
        </Header>

             <Item>
            <Icon name="search" />
            <Input ref="searching" autoFocus onChangeText={(text) =>this.filterSearch(text)}
                  placeholder='Search by Id'
                  value={this.state.text} />
            
          </Item>
          <Button full dark  onPress={()=> this.onClear()}>
            <Text style={{color: '#FAFAFA'}}>Clear Field</Text>
          </Button>
         
        <Content>
      <View style={{flex: 1, paddingTop: 20}}>
      <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>
        {this.state.dummyData.map((rowData,index) =>
         <Content padder key={rowData.id_order}>
          <Card style={styles.mb}>
             
            <CardItem style={{ paddingVertical: 0 }}>
              <Left>
                <Button iconLeft transparent>
                  <Icon active name="paper" />
                  <Text style={styless.titleText}>Order Id:{rowData.id_order}</Text>
                </Button>
              </Left>
              
             
              </CardItem>
              <CardItem>
               <Left>
                <Button iconLeft transparent>
                  <Icon active name="paper" />
                  <Text style={styless.titleText}>Ref No:{rowData.reference}</Text>
                </Button>
              </Left>
              </CardItem>
              
              <CardItem>
              <Left>
               <Button iconLeft transparent>
                  <Icon active name="paper" />
                  <Text style={styless.titleText}>Shipping No:{rowData.shipping_number}</Text>
                </Button>
              </Left>
              </CardItem>

              <CardItem>
              <Left>
                <Button iconLeft transparent>
                  <Icon active name="grid" />
                  <Text style={styless.titleText}>OrderDate:{rowData.date_add}</Text>
                </Button>
              </Left>
              

            </CardItem>
            <CardItem>
              <Left>
                <Button iconLeft transparent>
                  <Icon active name="paper-plane" />
                  <Text style={styless.titleText}>Carrier Name:{rowData.carrier_name}</Text>
                </Button>
              </Left>
              

            </CardItem>
           
              {rowData.products.map((item)=>

             <Card>
             <CardItem>
             <Body>
            <Image source={{uri: 'https://'+ item.product_image }} resizeMode='contain'  style={{height: 200, width: 250, flex: 1}} />
            </Body>
             </CardItem>
             <CardItem>
                {this.onRenderPName(item.product_name)}                   
            </CardItem>
            <CardItem>
            <Left>
                <Button iconLeft transparent>
                  <Icon active name="paw" />
                  <Text style={styless.titleText}>Product Size:{item.product_size}</Text>
                </Button>
              </Left>
              <Left>
                <Button iconLeft transparent>
                  <Icon active name="clipboard" />
                  <Text style={styless.titleText}>P_ID:{item.product_id}</Text>
                </Button>
              </Left>

            </CardItem>

             
            <CardItem>
           

              <Left>
              <Button dark
            onPress={() =>
             this.orderval()}
               >
            <Text style={{color: '#FAFAFA'}} >Get Location</Text>
          </Button>
              </Left>
              {this.onrender(item.product_id, item.product_size)}
       
            </CardItem>     
            <CardItem>
              <Left>
                <Button iconLeft transparent>
                  <Icon active name="archive" />
                  <Text style={{fontSize:12}}>Product Quantity:{item.product_quantity}</Text>
                </Button>
              </Left>
              <Right>

                   <Button iconLeft transparent >
                <Icon active name="barcode" />
                <Input style={{fontSize:15, width:100 }} placeholder='Click&Scan'  onChangeText={(tex) => this.setState({tex})} />
                 
              </Button>
              </Right>

            </CardItem>
            <CardItem>
              <Left>
              {(this.state.tex).slice(0,2) == item.product_size  ? 
                                <Item success>
                      <Input  value={"Right Item"}/>
                      <Icon name='checkmark-circle' />
                    </Item>
                         : 
                        <Item error>
            <Input value={"Wrong Item"}/>
            <Icon name='close-circle' />
          </Item>
                    }
              </Left>
             

              </CardItem>
              <CardItem>
               <Right>

                 <Button full dark  onPress={() => this.onProcessIncomplete(rowData.id_order, item.product_name, item.product_size, item.product_id)}>
            <Text style={{color: '#FAFAFA'}} >Item Unavailable</Text>
          </Button> 

              </Right>
              </CardItem>


            </Card>          )}




            <CardItem>
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
              <Left>
              <Button full dark  onPress={() => this.onIncompleteOrder(rowData.id_order)}>
            <Text style={{color: '#FAFAFA'}} >Incomplete Order</Text>
            </Button>
                
              </Left>
                <Right>
                <Button full dark  onPress={() => this.oncheck(rowData.id_order)}>
            <Text style={{color: '#FAFAFA'}} >Complete Order</Text>
          </Button> 
                </Right>
              </View>

            </CardItem>

          </Card>
        </Content>
        )}
                  
      </View>
         </Content>
      </Container>
    );
  }
}

const styless = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  titleText: {

    fontSize: 15,
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
