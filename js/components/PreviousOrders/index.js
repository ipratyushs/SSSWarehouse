import React, { Component } from "react";
import { Platform, TextInput, Alert, StyleSheet,View, Input, Image, ActivityIndicator} from "react-native";
import styles from "./styles";
import axios from 'axios';
import firebase from 'firebase';
import { Container, Header, Title,  Content, Button, Icon, Text, Right, Body, Left, Picker, Form, ListItem, Item as FormItem, Separator, CardItem, Card } from "native-base";
const Item = Picker.Item;
var temp3=[]
var temp=''
var result=[]
var resultloc = []
export default class previousOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderid:'',
      selected1: "Jul",
      selected2: "12th",
  		rawData:'',
      porderdata:[],
      dummyData:[],
       empty: true,
       text:'',
       locdata:[],
       temp3:[],
       checktext:'',
       tex:'',
       val:'',
       hello:false,
       data:[],
       result:[]

     };
  }
 onValueChange(value:string ) {
    this.setState({
      selected1: value
    });
  }

  onValueChange1(value:string ) {
    this.setState({
      
      selected2 : value
    });
  }

 oncheck(mon,dt){
      //FIREBASE API
      var date = mon+' '+dt;
      console.log(date);
            var user = firebase.auth().currentUser;
              if (user) {
              // User is signed in.
              var uid = user.uid;
            } else {
              // No user is signed in.
              console.log(error);
            }
             
              var firebaseVal = firebase.database().ref('Orders/').child(date);

                
              firebaseVal.on('value', function(datasnapshot){
              
               temp3 = datasnapshot.val();
               
              })
             
                console.log(temp3);
              result = _.map(temp3, function(value,prop){
              return {prop:prop, value:value}
              })
                this.setState({
                  porderdata:result,
                  rawData:result
                })
              console.log(result);
             
              

  }

  filterSearch(text){
        this.setState({text})
        let newData = this.dataFilter(text, this.state.rawData);
        this.setState({
            dummyData:newData,
            empty: false
        })

    }

    dataFilter(text, response){
        return response.filter(function(item){
            const itemData = item.value.shipping_number
            const textData = text
           
            // const courierData = item.carrier_name.toUpperCase()
            // const courierTextData = text.toUpperCase()
            if( itemData == textData){
              return item
            }

            // else{
            //   return courierData.indexOf(courierTextData) > -1
            // }

        })
    }

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
                temp1 = datasnapshot.toJSON()
               
              })
              console.log(temp1);
              resultloc = _.map(temp1, function(value,prop){
              return {prop:prop, value:value}
              })
                this.setState({
                  locdata:resultloc
                })
              console.log(resultloc);


             
  }

  onrenderlocation(itemid, itemsize){

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
 onValChange(){
 
  var ftext = null

  this.filterSearch(ftext);

 }


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
  var newPostKey2= firebae.database().ref().child('Total_Incomplete_Order').push()
  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
 
  updates['incomplete_Order/' + '/IC/' + newPostKey] = postData;

  firebase.database().ref().update(updates);

}

 onComplete(id){


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

clearField(){
  this.setState({
    text : null
  })
}

renderActivityLoader(result){
  if(this.state.rawData.length == 0){

      return (
      
          <ActivityIndicator/>
      
      )}

    
    
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
            <Title>Previous Orders</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <ListItem icon>
            
            <Body style={{width: 100}}>
               
              <Picker
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.selected1}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Item label="Jan" value="Jan" />
              <Item label="Feb" value="Feb" />
              <Item label="Mar" value="Mar" />
              <Item label="Apr" value="Apr"/>
              <Item label="May" value="May" />
              <Item label="Jun" value="Jun" />
              <Item label="Jul" value="Jul" />
              <Item label="Aug" value="Aug" />
              <Item label="Sep" value="Sep" />
              <Item label="Oct" value="Oct" />
              <Item label="Nov" value="Nov" />
              <Item label="Dec" value="Dec" />
            </Picker>
            </Body>
            <Right style={{width: 100}}>
            <Picker
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.selected2}
              onValueChange={this.onValueChange1.bind(this)}
            >
              <Item label="1st" value="1st" />
              <Item label="2nd" value="2nd" />
              <Item label="3rd" value="3rd" />
              <Item label="4th" value="4th" />
              <Item label="5th" value="5th" />
              <Item label="6th" value="6th" />
              <Item label="7th" value="7th" />
              <Item label="8th" value="8th" />
              <Item label="9th" value="9th" />
              <Item label="10th" value="10th" />
              <Item label="11th" value="11th" />
			  <Item label="12th" value="12th" />
              <Item label="13th" value="13th" />
              <Item label="14th" value="14th" />
              <Item label="15th" value="15th" />
              <Item label="16th" value="16th" />
              <Item label="17th" value="17th" />
              <Item label="18th" value="18th" />
              <Item label="19th" value="19th" />
              <Item label="20th" value="20th" />
              <Item label="21st" value="21st" />
              <Item label="22nd" value="22nd" />
              <Item label="23rd" value="23rd" />
              <Item label="24th" value="24th" />
              <Item label="25th" value="25th" />
              <Item label="26th" value="26th" />
              <Item label="27th" value="27th" />
              <Item label="28th" value="28th" />
              <Item label="29th" value="29th" />
              <Item label="30th" value="30th" />
              <Item label="31th" value="31th" />

            </Picker>	
            
          </Right>
        

          
          </ListItem> 
    
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <Left>
          <Button full dark onPress={() => this.oncheck(this.state.selected1,this.state.selected2)} >
            <Text style={{color: '#FAFAFA'}} >SYNC</Text>
          </Button> 
           </Left> 
           
          <Right>
          <Button full light
            onPress={() =>
             this.clearField()}
          
          >
            <Text style={styles.titleText}>CLEAR FIELD</Text>
          </Button>
         </Right> 
         
		      </View>
          {this.renderActivityLoader()}
          <TextInput style={styless.titleText}  placeholder="Search by Order ID" onChangeText={(text) =>this.filterSearch(text)} value={this.state.text}></TextInput>

 		      

 		<View style={{flex: 1, paddingTop: 20}}>
        {this.state.dummyData.map((rowData,index) =>
         <Content padder key={rowData.value.id_order}>
          <Card style={styles.mb}>
             
            <CardItem style={{ paddingVertical: 0 }}>
              <Left>
                <Button iconLeft transparent>
                  <Icon active name="paper" />
                  <Text style={styless.titleText}>Order Id:{rowData.value.id_order}</Text>
                </Button>
              </Left>
             
              </CardItem>
              <CardItem>
               <Left>
                <Button iconLeft transparent>
                  <Icon active name="paper" />
                  <Text style={styless.titleText}>Ref No:{rowData.value.reference}</Text>
                </Button>
              </Left>
              </CardItem>
              <CardItem>
              <Left>
               <Button iconLeft transparent>
                  <Icon active name="paper" />
                  <Text style={styless.titleText}>Shipping No:{rowData.value.shipping_number}</Text>
                </Button>
              </Left>
              </CardItem>
              <CardItem>
              <Left>
                <Button iconLeft transparent>
                  <Icon active name="grid" />
                  <Text style={styless.titleText}>OrderDate:{rowData.value.date_add}</Text>
                </Button>
              </Left>
              

            </CardItem>
            <CardItem>
              <Left>
                <Button iconLeft transparent>
                  <Icon active name="paper-plane" />
                  <Text style={styless.titleText}>Carrier Name:{rowData.value.carrier_name}</Text>
                </Button>
              </Left>
              

            </CardItem>
           
              {rowData.value.products.map((item)=>

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
		              <Right>
		                <Button iconLeft transparent>
		                  <Icon active name="clipboard" />
		                  <Text style={styless.titleText}>P_ID:{item.product_id}</Text>
		                </Button>
		              </Right>

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
		              {this.onrenderlocation(item.product_id, item.product_size)}
		       
		            </CardItem>     
		            <CardItem>
		              <Left>
		                <Button iconLeft transparent>
		                  <Icon active name="archive" />
		                  <Text style={{fontSize: 12}}>Product Quantity:{item.product_quantity}</Text>
		                </Button>
		              </Left>
		              <Body>
</Body>
                   
              <Right>
                <TextInput style={{width:100 , fontSize:15, fontWeight:'normal'}} placeholder='Click & Scan'   onChangeText={(tex) => this.setState({tex})} />
           </Right>
              
		     	 </CardItem>
		     	 <CardItem>
              
              {(this.state.tex).slice(0,2) == item.product_size  ? 
                                <Text>"Right Item"</Text>
                         : 
                        <Text>"Wrong Item"</Text>
                    }
              
             

              </CardItem>


		     	 <CardItem>
               <Right>

                 <Button full dark  onPress={() => this.onProcessIncomplete(rowData.value.id_order, item.product_name, item.product_size, item.product_id)}>
            <Text style={{color: '#FAFAFA'}} >Item Unavailable</Text>
          </Button> 

              </Right>
              </CardItem>
              	</Card>


              )}		

            <CardItem>
              
              <Body>
                <Button full dark  onPress={() => this.onComplete(rowData.value.id_order)}>
            <Text style={{color: '#FAFAFA'}} >Complete Order</Text>
          </Button> 
              </Body>



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
  titleText: {

    fontSize: 15,
    fontWeight: 'normal'
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