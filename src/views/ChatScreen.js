import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    AsyncStorage,
    Image
} from "react-native";
import Form from "../components/Message/Form";
import * as Color from "../constrains/color";
import socket from "../utils/socket";

class LogoTitle extends Component {
    render() {
        const { username } = this.props;
        return (
            <View>
                <View style={styles.containerRow}>
                    <Text style={styles.title}>SEND LOVELY MESSAGES</Text>
                    <Image
                        style={{
                            marginHorizontal: 10,
                            width: 30,
                            height: 30
                        }}
                        source={require("../../public/images/icons8_Two_Hearts_50px.png")}
                    />
                </View>
                {username ? (
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.username}>{username}</Text>
                        <View
                            style={{
                                width: 7,
                                height: 7,
                                backgroundColor: Color.onlineColor,
                                borderRadius: 7,
                                marginHorizontal: 5,
                                marginVertical: 7
                            }}
                        />
                    </View>
                ) : null}
            </View>
        );
    }
}

export default class ChatScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (
                <LogoTitle username={navigation.getParam("username")} />
            )
        };
    };

    constructor(props) {
        super(props);
        e = this;
        this.state = {
            client: socket(),
            messages: [],
            username: "",
            isTyping: false
        };
    }

    onSendMessage = message => {
        const { username } = this.state;
        this.state.client.onSendMessage({ message, username });
    };

    onTyping = () => {
        this.state.client.typing(this.state.username);
    };

    onStopTyping = () => {
        this.state.client.stopTyping(this.state.username);
    };

    componentDidMount() {
        const { navigation } = this.props;
        const username = navigation.getParam("username");
        this.setState({ username });
        this.state.client.fetchMessages(messages => {
            this.setState({ messages });
            console.log(messages);
        });
        this.state.client.onTyping(username => {
            this.setState({ isTyping: true });
            console.log(username + " is typing...");
        });
        this.state.client.onStopTyping(username => {
            this.setState({ isTyping: false });
            console.log(username + " stop typing...");
        });
    }

    render() {
        const { messages, username, isTyping } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.container1}>
                    <ScrollView>
                        <BalloonMessages
                            messages={messages}
                            username={username}
                        />
                        {isTyping ? (
                            <Image
                                style={{ width: 50, height: 30, margin: 15 }}
                                source={require("../../public/images/typingiphone.gif")}
                            />
                        ) : null}
                    </ScrollView>
                    <Form
                        onSendMessage={this.onSendMessage}
                        onTyping={this.onTyping}
                        onStopTyping={this.onStopTyping}
                    />
                </View>
            </View>
        );
    }
}

const BalloonMessages = props =>
    props.messages.map((message, index) => {
        return (
            <View key={index}>
                {message.username === props.username ? (
                    <View style={styles.floatRight} key={index}>
                        <View style={styles.balloonMessageRight}>
                            <Text style={styles.balloonMessageText}>
                                {message.message}
                            </Text>
                        </View>
                    </View>
                ) : (
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            style={styles.avatar}
                            source={require("../../public/images/studio-2.jpg")}
                        />
                        <Text style={styles.balloonMessageLeft}>
                            {message.message}
                        </Text>
                    </View>
                )}
            </View>
        );
    });

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
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 30,
        margin: 5
    }
});

const getId = () => {
    return Math.random()
        .toString(36)
        .substring(2, 15);
};
