const { Component } = require("@leverage/core");

class WebSocketComponent extends Component {
    type = "websocket";
    config = {
        websocket: {
            event: "room:unhide",
        },
        dependencies: {
            services: ["names", "rooms"],
        },
    };

    websocket({ socket, data }) {
        this.services.rooms.unhide(data.id, socket, data.key);
    }
}

module.exports = WebSocketComponent;
