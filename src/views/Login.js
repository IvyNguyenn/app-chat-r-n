import React, { Component } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    AsyncStorage,
    TouchableOpacity,
    Alert
} from "react-native";
import socket from "../utils/socket";

export default class Login extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        e = this;
        this.state = {
            client: socket(),
            username: "ngochoang",
            password: "123"
        };
    }

    onResetForm = () => {
        this.setState({
            username: "",
            password: ""
        });
    };

    saveToStorage = async username => {
        try {
            await AsyncStorage.setItem("@USERNAME", JSON.stringify(username));
        } catch (e) {
            console.log(e);
        }
    };

    onError = (title, error) => {
        Alert.alert(
            title,
            error,
            [{ text: "Try again", onPress: () => console.log("Try again") }],
            { cancelable: false }
        );
    };

    onValidate = (username, password) => {
        if (username && password) return true;
        return false;
    };

    onLogin = () => {
        const { client, username, password } = this.state;
        if (this.onValidate(username, password)) {
            client.login({ username, password });
        }
    };

    onRegister = () => {
        this.props.navigation.navigate("Register");
    };

    componentDidMount() {
        const { client } = this.state;
        client.loginSuccess(username => {
            this.props.navigation.navigate("ChatScreen", { username });
            this.onResetForm();
        });
        client.onError(error => {
            this.onError("Warning", error);
        });
    }

    componentWillReceiveProps(nextProps) {
        const username = nextProps.navigation.getParam("username");
        if (username) {
            this.setState({ username });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: 25,
                            color: "green"
                        }}
                    >
                        {"Login"}
                    </Text>
                </View>
                <View style={{ flex: 2 }}>
                    <TextInput
                        style={styles.textInput}
                        placeholder=" Username"
                        onChangeText={username => this.setState({ username })}
                        value={this.state.username}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder=" Password"
                        secureTextEntry={true}
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    />
                    <Button
                        title="Login"
                        color="green"
                        onPress={this.onLogin}
                    />
                    <View style={{ marginVertical: 5 }} />
                    <Button title="Register" onPress={this.onRegister} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: "10%"
    },
    round: {},
    textInput: {
        height: 40,
        borderColor: "#909497",
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10
    }
});
