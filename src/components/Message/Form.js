import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Button
} from "react-native";
import * as Color from "../../constrains/color";

export default class From extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            id: "",
            isShowForm: false
        };
    }

    onHandleChange = content => {
        this.setState({ content });
        if (content) this.props.onTyping();
        else this.props.onStopTyping();
    };

    onResetForm = () => {
        this.setState({
            id: "",
            content: ""
        });
    };

    onToggleForm = () => {
        if (this.props.selectedTask) {
            this.onResetForm();
        }
        this.setState({
            isShowForm: !this.state.isShowForm
        });
    };

    onValidate = e => {
        if (e) return true;
        return false;
    };

    onSendMessage = () => {
        let { content } = this.state;
        if (this.onValidate(content)) {
            this.props.onStopTyping();
            this.props.onSendMessage(content);
            this.onResetForm();
        }
    };

    // componentWillReceiveProps(nextProps) {
    //     const { selectedTask } = nextProps;
    //     if (selectedTask) {
    //         this.setState({
    //             id: selectedTask.id,
    //             text: selectedTask.content,
    //             isShowForm: true
    //         });
    //     }
    // }

    componentDidUpdate() {}

    render() {
        const { isShowForm, content } = this.state;
        const { selectedTask } = this.props;
        return (
            <View>
                <View>
                    <TouchableOpacity
                        style={styles.floatBtn}
                        onPress={this.onToggleForm}
                    >
                        <Text style={styles.textInFloatBtn}>+</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={styles.container}
                    style={{ display: isShowForm ? "flex" : "none" }}
                >
                    <TextInput
                        style={{
                            height: 40,
                            borderColor: "gray",
                            borderWidth: 1
                        }}
                        placeholder="  Your message ..."
                        value={content}
                        onChangeText={content => this.onHandleChange(content)}
                    />
                    <Button
                        title={selectedTask ? "UPDATE" : "SEND"}
                        color={Color.mainColor}
                        onPress={this.onSendMessage}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end"
    },
    floatBtn: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: Color.mainColor,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-end",
        position: "absolute",
        bottom: 5,
        right: 5
    },
    textInFloatBtn: {
        color: "#FFF",
        fontWeight: "bold",
        textAlign: "center"
    }
});
