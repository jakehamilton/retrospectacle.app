import { h, createContext } from "preact";
import { useMemo, useEffect, useState } from "preact/hooks";
import io from "socket.io-client";
import { v4 as uuid } from "uuid";

export const SOCKET_IO_CONTEXT = createContext({
    socket: null,
});

const SocketIO = ({
    host = window.location.host,
    path = "",
    port = "",
    children,
}) => {
    const [user, setUser] = useState({
        name: "Unknown",
        id: "",
        key: "",
    });

    const socket = useMemo(() => {
        const socket = io(`${host}${port ? `:${port}` : ""}${path}`, {
            host,
            path,
            port,
        });

        return socket;
    }, [host, path]);

    useEffect(() => {
        const connectInterval = setInterval(() => {
            socket.disconnect();
            socket.connect();
        }, 5000);

        const handleSetUser = (user) => {
            clearInterval(connectInterval);
            let key = localStorage.getItem("data/user/key");

            if (!key) {
                key = uuid();
                localStorage.setItem("data/user/key", key);
            }

            setUser({
                ...user,
                key,
            });
        };

        socket.on("set:user", handleSetUser);

        return () => {
            socket.off("set:user", handleSetUser);
            clearInterval(connectInterval);
        };
    }, [socket]);

    return (
        <SOCKET_IO_CONTEXT.Provider value={{ socket, user }}>
            {children}
        </SOCKET_IO_CONTEXT.Provider>
    );
};

export default SocketIO;
