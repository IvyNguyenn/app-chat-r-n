import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import styles from "../../utils/styles";

export default class HeaderChat extends Component {
    render() {
        const { username } = this.props;
        return (
            <View style={{ marginHorizontal: 10 }}>
                <View style={styles.containerRow}>
                    <Text style={styles.title}>SEND LOVELY MESSAGES</Text>
                    <Image
                        style={{
                            marginHorizontal: 10,
                            width: 30,
                            height: 30
                        }}
                        source={require("../../../public/images/icons8_Two_Hearts_50px.png")}
                    />
                </View>
                {username ? (
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.username}>{username}</Text>
                        <View style={styles.onlineDot} />
                    </View>
                ) : null}
            </View>
        );
    }
}
