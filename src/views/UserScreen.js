import React, { Component } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import HeaderChat from "../components/Header/HeaderChat";
import styles from "../utils/styles";
import socket from "../utils/socket";

export default class UserScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (
                <HeaderChat username={navigation.getParam("username")} />
            )
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            client: socket(),
            users: []
        };
    }

    onChatScreen = friendname => {
        let username = this.props.navigation.getParam("username");
        this.props.navigation.navigate("ChatScreen", { friendname, username });
    };

    componentDidMount() {
        console.log(" ===== fetch user =========");
        this.state.client.fetchUsers(users => {
            this.setState({ users });
            console.log("==== users ======");
            console.log(users);
        });
    }

    render() {
        const { users } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.container1}>
                    <ScrollView>
                        <UserItems
                            users={users}
                            onChatScreen={this.onChatScreen}
                        />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const UserItems = props =>
    props.users.map((user, index) => {
        return (
            <TouchableOpacity
                key={index}
                style={styles.userItem}
                onPress={props.onChatScreen.bind(this, user.username)}
            >
                <View style={{ flexDirection: "row" }}>
                    <Image
                        style={styles.avatarUser}
                        source={require("../../public/images/studio-2.jpg")}
                    />
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row"
                            }}
                        >
                            <View style={styles.onlineDot} />
                            <Text style={styles.usernameItem}>
                                {user.username}
                            </Text>
                        </View>
                        <Text style={styles.lightText}>message</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    });
