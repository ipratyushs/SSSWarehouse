import React, { Component } from "react";
import { BackAndroid, StatusBar, Platform } from "react-native";
import { variables, Drawer } from "native-base";

import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import platform from "../native-base-theme/variables/platform";

import Home from "./components/home/";
import previousOrders from "./components/PreviousOrders/";
import missingItem from "./components/MissingItem/";
import searchOrder from "./components/SearchOrder/";
import productLocation from "./components/ProductLocation/";
import allUsers from "./components/AllUsers/";
import SideBar from "./components/sidebar";
import todayOrders from "./components/TodayOrders";
import userProgress from "./components/UserProgress";


class AppNavigator extends Component {
  render() {
    return ;
  }
}

export default AppNavigator;
