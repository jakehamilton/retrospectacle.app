const { Service } = require("@leverage/core");

/*

{
    id: string,
    owner: string,
    state: {
        item: null | {...} // see below
        items: Array<{
            kind: "needs-improvement" | "keep-doing" | "compliment",
            comment: string,
            action: string | null,
            key: string,
        }>
    },
    users: Set<socket>
}

*/

const ONE_HOUR = 1000 * 60 * 60;
const TEN_DAYS = ONE_HOUR * 24 * 10;

class RoomsService extends Service {
    name = "rooms";
    config = {
        dependencies: {
            plugins: ["websocket"],
            services: ["names"],
        },
    };

    rooms = new Map();

    constructor() {
        super();

        setInterval(() => {
            this.cleanup();
        }, ONE_HOUR);
    }

    cleanup() {
        const now = Date.now();

        for (const [id, room] of this.rooms.entries()) {
            if (now - room.timestamp > TEN_DAYS) {
                for (const socket of room.users) {
                    this.leave(id, socket);
                    socket.emit("room:leave");
                }

                this.rooms.delete(id);
            }
        }
    }

    join(id, socket, key) {
        if (!this.rooms.has(id)) {
            this.rooms.set(id, {
                id,
                timestamp: Date.now(),
                owner: {
                    socket,
                    key,
                },
                state: {
                    item: null,
                    items: [
                        {
                            kind: "needs-improvement",
                            comment: "Something important here.",
                            action: "",
                            shown: false,
                            key: 0,
                        },
                        {
                            kind: "keep-doing",
                            comment: "Something important here.",
                            action: "",
                            shown: false,
                            key: 1,
                        },
                        {
                            kind: "compliment",
                            comment: "Something important here.",
                            action: "",
                            shown: true,
                            key: 2,
                        },
                    ],
                },
                users: new Set(),
            });
        }

        const room = this.rooms.get(id);

        room.timestamp = Date.now();

        room.users.add(socket);

        if (room.owner.key === key) {
            room.owner.socket = socket;
        }

        socket.join(id);
        socket.joinedRooms.push(id);
        this.update(id);
    }

    leave(id, socket) {
        socket.leave(id);

        const room = this.rooms.get(id);

        if (!room) {
            return;
        }

        if (!room.users.has(socket)) {
            return;
        }

        room.users.delete(socket);

        this.update(id);
    }

    show(id, socket, key, itemKey) {
        const room = this.rooms.get(id);

        if (!room) {
            return;
        }

        if (room.owner.key !== key) {
            return;
        }

        const item = room.state.items.find((item) => item.key === itemKey);

        if (!item) {
            return;
        }

        room.state.item = item;
        item.shown = true;

        this.update(id);
    }

    submit(id, socket, value) {
        const room = this.rooms.get(id);

        if (!room) {
            return;
        }

        if (!room.users.has(socket)) {
            return;
        }

        room.state.items.push(value);

        this.update(id);
    }

    action(id, socket, key, itemKey, action) {
        const room = this.rooms.get(id);

        if (!room) {
            return;
        }

        if (room.owner.key !== key) {
            return;
        }

        const item = room.state.items.find((item) => item.key === itemKey);

        if (!item) {
            return;
        }

        item.action = action;

        this.update(id);
    }

    delete(id, socket, key, itemKey) {
        const room = this.rooms.get(id);

        if (!room) {
            return;
        }

        if (room.owner.key !== key) {
            return;
        }

        const index = room.state.items.findIndex(
            (item) => item.key === itemKey
        );

        if (index === -1) {
            return;
        }

        if (room.state.item && room.state.item.key === itemKey) {
            room.state.item = null;
        }

        room.state.items.splice(index, 1);

        this.update(id);
    }

    update(id) {
        const room = this.rooms.get(id);

        if (!room) {
            return;
        }

        const users = [...room.users].map((socket) => {
            return {
                name: socket.user.name,
                id: socket.id,
            };
        });

        for (const socket of room.users) {
            if (socket.id === room.owner.socket.id) {
                socket.emit("room:update", {
                    id,
                    owner: room.owner.socket.id,
                    state: {
                        item: room.state.item,
                        items: room.state.items,
                    },
                    users,
                });
            } else {
                socket.emit("room:update", {
                    id,
                    owner: room.owner.socket.id,
                    state: {
                        item: room.state.item,
                    },
                    users,
                });
            }
        }
    }
}

module.exports = RoomsService;
