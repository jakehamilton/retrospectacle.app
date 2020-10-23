import { h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Link } from "preact-router";
import { css } from "goober";
import { Gap, Text, Button, useTheme } from "@jakehamilton/ui";
import useSocket from "../../hooks/useSocket";
import ItemsDisplay from "../ItemsDisplay";
import OwnerItem from "../OwnerItem";

const padNumber = (number) => {
    if (number < 10) {
        return `0${number}`;
    } else {
        return String(number);
    }
};

const Timer = ({ item }) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        setTime(0);

        const interval = setInterval(() => {
            setTime((prevTime) => {
                return prevTime + 1;
            });
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [item.key]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <Text bold color={minutes > 4 ? "secondary" : "text"}>
            {padNumber(minutes)}:{padNumber(seconds)}
        </Text>
    );
};

const RoomOwnerContentClass = ({ pad }) => {
    return css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding-left: ${pad(1)}px;
        padding-right: ${pad(1)}px;
        overflow-x: hidden;
        overflow-y: auto;
    `;
};

const InfoClass = ({ pad }) => {
    return css`
        width: 100%;
        max-width: 1024px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: ${pad(6)}px;
        padding-right: ${pad(6)}px;

        @media screen and (max-width: 650px) {
            justify-content: flex-end;
        }
    `;
};

const InfoLinkClass = () => {
    return css``;
};

const InfoLeftClass = () => {
    return css`
        @media screen and (max-width: 650px) {
            display: none;
        }
    `;
};

const InfoRightClass = () => {
    return css`
        display: flex;
        align-items: center;

        @media screen and (max-width: 650px) {
            display: none;
        }
    `;
};

const RoomOwnerContent = ({ room }) => {
    const theme = useTheme();
    const { socket, user } = useSocket();
    const url = `${document.location.host}/#/room/${room.id}`;

    const handleChangeActionItem = ({ item, action }) => {
        socket.emit("room:action", {
            id: room.id,
            key: user.key,
            item: item,
            action,
        });
    };

    const handleShow = (item) => {
        socket.emit("room:show", {
            id: room.id,
            key: user.key,
            item,
        });
    };

    const handleDelete = (item) => {
        socket.emit("room:delete", {
            id: room.id,
            key: user.key,
            item,
        });
    };

    const handleNextItem = () => {};

    return (
        <div className={RoomOwnerContentClass(theme)}>
            <Gap vertical size={6} />
            <div className={InfoClass(theme)}>
                <div className={InfoLeftClass()}>
                    <Text
                        as={Link}
                        color="primary.light"
                        href={`https://${url}`}
                        className={InfoLinkClass()}
                    >
                        {url}
                    </Text>
                </div>
                <div className={InfoRightClass()}>
                    <Button
                        onClick={handleNextItem}
                        disabled={room.state.items.every((item) => item.shown)}
                    >
                        Next Item
                    </Button>
                    {room.state.item ? (
                        <Fragment>
                            <Gap horizontal size={2} />
                            <Timer item={room.state.item} />
                        </Fragment>
                    ) : null}
                </div>
            </div>
            {room.state.item ? (
                <Fragment>
                    <Gap vertical size={6} />
                    <OwnerItem
                        item={room.state.item}
                        onChangeActionItem={handleChangeActionItem}
                    />
                </Fragment>
            ) : null}
            <Gap vertical size={6} />
            <ItemsDisplay
                items={room.state.items}
                onShow={handleShow}
                onDelete={handleDelete}
            />
            <Gap vertical size={6} />
        </div>
    );
};

export default RoomOwnerContent;
