/* @flow */

import React from "react";
import { DrawerNavigator } from "react-navigation";
import Home from "./components/home/";
import previousOrders from "./components/PreviousOrders/";
import missingItem from "./components/MissingItem/";
import searchOrder from "./components/SearchOrder/";
import productLocation from "./components/ProductLocation/";
import allUsers from "./components/AllUsers/";
import SideBar from "./components/sidebar";
import todayOrders from "./components/TodayOrders";
import userProgress from "./components/UserProgress";


const DrawerExample = DrawerNavigator(
  {
    Home: { screen: Home },
    previousOrders: { screen: previousOrders }, 
    missingItem: { screen: missingItem },
    searchOrder: { screen: searchOrder },
    productLocation: { screen: productLocation },   
    allUsers: { screen: allUsers },   
    todayOrders: { screen: todayOrders },
    userProgress: { screen: userProgress },
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

export default DrawerExample;
