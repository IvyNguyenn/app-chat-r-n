import React, { Component } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { createStackNavigator } from "react-navigation";
import ChatScreen from "./src/views/ChatScreen";
import Login from "./src/views/Login";
import Register from "./src/views/Register";
import UserScreen from "./src/views/UserScreen";

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <RootStack />
            </View>
        );
    }
}

const RootStack = createStackNavigator(
    {
        Login,
        ChatScreen,
        Register,
        UserScreen
    },
    // {
    //     headerMode: "none",
    //     navigationOptions: {
    //         headerVisible: false
    //     }
    // },
    {
        initialRouteName: "Login"
    }
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
