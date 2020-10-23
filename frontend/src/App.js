import { h } from "preact";
import { css } from "goober";
import { AppBar, Block, H3, Button, Gap, useTheme } from "@jakehamilton/ui";

import GitHubIcon from "./components/GitHubIcon";
import AppContent from "./components/AppContent";
import Gachapon from "./components/Gachapon";
import SocketIO from "./components/SocketIO";
import useScript from "./hooks/useScript";

const AppClass = ({ background }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: ${background};
    overflow: hidden;
`;

const AppBarClass = css`
    flex-shrink: 0;
`;

const AppContentClass = css`
    flex-grow: 1;
`;

const HomeLinkClass = css`
    display: flex;
    align-items: center;
    text-decoration: none;
`;

const App = () => {
    const { theme } = useTheme();

    return (
        <Block
            color="background"
            className={AppClass({ background: theme.background.main })}
        >
            <AppBar
                className={AppBarClass}
                color="background.light"
                left={
                    <H3 as="a" href="/" className={HomeLinkClass}>
                        <Gachapon scale="0.1" />
                        <Gap horizontal size={1} />
                        Retro Spectacle
                    </H3>
                }
                right={
                    <Button
                        variant="text"
                        color="text"
                        as="a"
                        href="https://github.com/jakehamilton/retrospectacle.app"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <GitHubIcon />
                    </Button>
                }
            />
            <SocketIO host={process.env.API_HOST} port={process.env.API_PORT}>
                <AppContent className={AppContentClass} />
            </SocketIO>
        </Block>
    );
};

export default App;
