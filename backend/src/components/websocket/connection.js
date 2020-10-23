const { Component } = require("@leverage/core");

class WebSocketComponent extends Component {
    type = "websocket";
    config = {
        websocket: {
            event: "connection",
        },
        dependencies: {
            services: ["names"],
        },
    };

    websocket({ socket }) {
        socket.user = {
            name: this.services.names.user(),
            id: socket.id,
        };

        socket.joinedRooms = [];

        socket.emit("set:user", socket.user);
    }
}

module.exports = WebSocketComponent;
