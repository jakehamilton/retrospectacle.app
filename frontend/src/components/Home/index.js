import { h } from "preact";
import { route } from "preact-router";
import cn from "classnames";
import { css } from "goober";
import { H1, H4, Gap, Button } from "@jakehamilton/ui";

import useSocket from "../../hooks/useSocket";
import Gachapon from "../Gachapon";

const HomeClass = css`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const Home = ({ className }) => {
    const { socket, user } = useSocket();

    const handleCreateRoom = () => {
        socket.emit("room:create");
        socket.once("room:create", ({ id }) => {
            route(`/room/${id}`);
        });
    };

    return (
        <div className={cn(HomeClass, className)}>
            <Gap vertical size={6} />
            <Gachapon />
            <Gap vertical size={3} />
            <H1>Retro Spectacle</H1>
            <H4>Retrospective With Some Pop</H4>
            <Gap vertical size={4} />
            <Button onClick={handleCreateRoom} disabled={user.id === ""}>
                Create Room
            </Button>
            <Gap vertical size={6} />
        </div>
    );
};

export default Home;
