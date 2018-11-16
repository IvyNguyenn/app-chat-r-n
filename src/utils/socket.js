import io from "socket.io-client";
import { API_URL } from "./config";

export default function() {
    const socket = io(API_URL, { jsonp: false });

    function login(user) {
        return socket.emit("LOGIN", user);
    }

    function register(user) {
        return socket.emit("REGISTER", user);
    }

    function disconnect() {
        return socket.disconnect();
    }

    function typing(username) {
        return socket.emit("TYPING", username);
    }

    function stopTyping(username) {
        return socket.emit("STOP-TYPING", username);
    }

    function loginSuccess(username) {
        return socket.on("LOGIN-SUCCESS", username);
    }

    function registerSuccess(username) {
        return socket.on("REGISTER-SUCCESS", username);
    }

    function fetchMessages(messages) {
        return socket.on("SEND-MESSAGE", messages);
        //console.log("============= FETCH MESSAGES =============");
    }

    function onSendMessage(message) {
        return socket.emit("SEND-MESSAGE", message);
    }

    function onTyping(username) {
        return socket.on("TYPING", username);
    }

    function onStopTyping(username) {
        return socket.on("STOP-TYPING", username);
    }

    function onError(error) {
        return socket.on("ERROR", error);
    }

    return {
        login,
        register,
        disconnect,
        typing,
        stopTyping,
        loginSuccess,
        registerSuccess,
        fetchMessages,
        onSendMessage,
        onTyping,
        onStopTyping,
        onError
    };
}
