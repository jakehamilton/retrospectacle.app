import { h, Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";
import { route, Link } from "preact-router";
import cn from "classnames";
import { css } from "goober";
import { H1, H4, Gap, Button, Text } from "@jakehamilton/ui";

import useSocket from "../../hooks/useSocket";
import RoomOwnerContent from "../RoomOwnerContent";
import RoomUserContent from "../RoomUserContent";

const RoomClass = css`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
`;

const LoadingClass = css`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const Content = ({ room }) => {
    const { user } = useSocket();

    return room.owner === user.id ? (
        <RoomOwnerContent room={room} />
    ) : (
        <RoomUserContent room={room} />
    );
};

const Room = ({ className, id }) => {
    const { socket, user } = useSocket();

    const [room, setRoom] = useState(null);

    useEffect(() => {
        // User has not been updated yet
        if (user.id === "") {
            return;
        }

        const handleUpdate = (data) => {
            console.log("update");
            setRoom(data);
        };

        const handleLeave = () => {
            route("/");
        };

        socket.emit("room:join", { id, key: user.key });
        socket.on("room:update", handleUpdate);
        socket.on("room:leave", handleLeave);

        return () => {
            socket.off(handleUpdate);
            socket.off(handleLeave);
            socket.emit("room:leave", { id });
        };
    }, [user]);

    return (
        <div className={cn(RoomClass, className)}>
            {room ? (
                <Content room={room} />
            ) : (
                <div className={LoadingClass}>
                    <Gap vertical size={6} />
                    <H1>Loading</H1>
                    <H4 color="text.light">{id}</H4>
                </div>
            )}
        </div>
    );
};

export default Room;
