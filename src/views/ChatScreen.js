import React, { Component } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import Form from "../components/Message/Form";
import HeaderChat from "../components/Header/HeaderChat";
import styles from "../utils/styles";
import socket from "../utils/socket";

export default class ChatScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (
                <HeaderChat username={navigation.getParam("friendname")} />
            )
        };
    };

    constructor(props) {
        super(props);
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
        console.log("========== componentDidMount =============");
        const { navigation } = this.props;
        let username = navigation.getParam("username");
        this.setState({ username });
        this.state.client.fetchMessages(messages => {
            this.setState({ messages });
            console.log("===== messages =====");
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
                            style={styles.avatarChat}
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

const getId = () => {
    return Math.random()
        .toString(36)
        .substring(2, 15);
};
