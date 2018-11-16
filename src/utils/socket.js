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

    function fetchUsers(users) {
        return socket.on("SEND-USERS", users);
    }

    function fetchMessages(messages) {
        return socket.on("SEND-MESSAGES", messages);
    }

    function onSendMessage(message) {
        return socket.emit("SEND-MESSAGES", message);
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
        fetchUsers,
        fetchMessages,
        onSendMessage,
        onTyping,
        onStopTyping,
        onError
    };
}
