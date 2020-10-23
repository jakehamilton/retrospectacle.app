const { Component } = require("@leverage/core");

class WebSocketComponent extends Component {
    type = "websocket";
    config = {
        websocket: {
            event: "disconnect",
        },
        dependencies: {
            services: ["names", "rooms"],
        },
    };

    websocket({ socket }) {
        for (const room of socket.joinedRooms) {
            this.services.rooms.leave(room, socket);
        }

        this.services.names.freeUser(socket.user.name);
    }
}

module.exports = WebSocketComponent;
