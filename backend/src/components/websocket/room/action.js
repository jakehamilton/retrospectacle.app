const { Component } = require("@leverage/core");

class WebSocketComponent extends Component {
    type = "websocket";
    config = {
        websocket: {
            event: "room:action",
        },
        dependencies: {
            services: ["names", "rooms"],
        },
    };

    websocket({ socket, data }) {
        this.services.rooms.action(
            data.id,
            socket,
            data.key,
            data.item,
            data.action
        );
    }
}

module.exports = WebSocketComponent;
