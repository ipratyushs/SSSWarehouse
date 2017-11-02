import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, Image } from 'react-native';
import {CheckBox, ListItem, Container, Content,  Header, Left, Right, Button, Icon, Body, Title, Card, CardItem, Thumbnail} from 'native-base';
import styles from "./styles";
import axios from 'axios';
import FormData from 'form-data';

const cardImage = require("../../../img/drawer-cover.png");
var form = new FormData();
form.append('webservice_key', 'L14YN7LAVX2CH3RA5M1DDWNFRLLVMA32');
export default class SegmentNB extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      checkbox: false
    }
    console.log(navigation.state.params.uid)
  }
    toggleSwitch() {
    this.setState({
      checkbox: !this.state.checkbox,
    });
  }

  _handlePress(){
    alert("order completed");
  }

 componentDidMount() {
    axios.post('https://streetstylestore.com/index.php?controller=orderdispatch', form)
      .then((response) => {
        console.log(response);
  
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(response.data),
        }, function() {
          // do something with new state
          
        });
      })
      .catch((error) => {
        console.error(error);
      });
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
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Right>
            <Button transparent>
              <Icon name="search" />
            </Button>
          </Right>
        </Header>
         
        <Content>
      <View style={{flex: 1, paddingTop: 20}}>
        <ListView 
          dataSource={this.state.dataSource}
          renderRow={(rowData) => 
         <Content padder>
          <Card style={styles.mb}>
            <CardItem cardBody>
              <Image
                style={{
                  resizeMode: "cover",
                  width: null,
                  height: 150,
                  flex: 1
                }}
                source={cardImage}
              />
            </CardItem>

            <CardItem style={{ paddingVertical: 0 }}>
              <Left>
                <Button iconLeft transparent>
                  <Icon active name="paper" />
                  <Text>Product Name:{rowData.title}</Text>
                </Button>
              </Left>
              </CardItem>
              <CardItem>
              <Left>
                <Button iconLeft transparent>
                  <Icon active name="cart" />
                  <Text>Quantity:{rowData.releaseYear}</Text>
                </Button>
              </Left>
               <Right>
                <Button iconLeft transparent>
                  <Icon active name="navigate" />
                  <Text>Location:{rowData.title}</Text>
                </Button>
              </Right>

            </CardItem>
          </Card>
        </Content>
        }/>
         <ListItem button onPress={() => this.toggleSwitch()}>
        
            <CheckBox checked={this.state.checkbox} onPress={() => this.toggleSwitch()} />
          <Body>
              <Text>Selected all Items?</Text>
            </Body>
          </ListItem> 
            <Button full success onPress={()=>this._handlePress()}>
            <Text>Complete Order</Text>
          </Button>
      </View>
         </Content>
      </Container>
        
           
    );
  }
}