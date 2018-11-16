import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Color from "../constrains/color";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    container1: {
        flex: 1,
        justifyContent: "flex-end"
    },
    containerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        textAlign: "center",
        color: Color.mainColor,
        fontWeight: "bold"
    },
    textInput: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        justifyContent: "flex-start"
    },
    lightText: {
        color: "gray"
    },
    balloonMessageRight: {
        backgroundColor: Color.mainColor,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 3,
        borderRadius: 10,
        maxWidth: "55%"
    },
    balloonMessageLeft: {
        backgroundColor: "#F1F0F0",
        padding: 10,
        marginHorizontal: 5,
        marginVertical: 3,
        borderRadius: 10,
        maxWidth: "55%"
    },
    balloonMessageText: {
        color: "#FFFFFF"
    },
    floatRight: {
        alignItems: "flex-end"
    },
    username: {
        color: "#9E94A8"
    },
    avatarChat: {
        width: 30,
        height: 30,
        borderRadius: 30,
        margin: 5
    },
    onlineDot: {
        width: 7,
        height: 7,
        backgroundColor: Color.onlineColor,
        borderRadius: 7,
        marginHorizontal: 5,
        marginVertical: 7
    },
    userItem: {
        borderBottomColor: Color.borderColor,
        borderBottomWidth: 1
    },
    usernameItem: {
        fontSize: 17
    },
    avatarUser: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginHorizontal: 15,
        marginVertical: 10
    }
});

export default styles;
