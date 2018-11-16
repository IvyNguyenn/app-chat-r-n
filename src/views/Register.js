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

export default class Register extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            client: socket(),
            username: "ngochoang2",
            password: "123",
            confirmPass: "123"
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

    onValidate = (username, password, confirmPass) => {
        if (username && password && confirmPass && password === confirmPass)
            return true;
        return false;
    };

    onLogin = () => {
        this.props.navigation.navigate("Login");
    };

    onRegister = () => {
        const { client, username, password, confirmPass } = this.state;
        if (this.onValidate(username, password, confirmPass)) {
            client.register({ username, password });
        }
    };

    componentDidMount() {
        const { client } = this.state;
        client.registerSuccess(username => {
            this.props.navigation.navigate("Login", { username });
            this.onResetForm();
        });
        client.onError(error => {
            this.onError("Warning", error);
        });
    }

    render() {
        const { navigate } = this.props.navigation;
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
                        {"Register"}
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
                    <TextInput
                        style={styles.textInput}
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                        onChangeText={confirmPass =>
                            this.setState({ confirmPass })
                        }
                        value={this.state.confirmPass}
                    />
                    <Button
                        title="Register"
                        color="green"
                        onPress={this.onRegister}
                    />
                    <View style={{ marginVertical: 5 }} />
                    <Button title="Login" onPress={this.onLogin} />
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
