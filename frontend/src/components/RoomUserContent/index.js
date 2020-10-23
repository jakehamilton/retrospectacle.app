import { h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import { css } from "goober";
import { H2, Gap, Button, Block, useTheme, H3, Text } from "@jakehamilton/ui";
import { v4 as uuid } from "uuid";

import Gachapon from "../Gachapon";
import useSocket from "../../hooks/useSocket";
import DropDownArrowIcon from "../DropDownArrowIcon";
import UserItem from "../UserItem";
import ItemsDisplay from "../ItemsDisplay";

const LARGE_BREAK = "1024px";
const MEDIUM_BREAK = "800px";
const SMALL_BREAK = "500px";

const RoomUserContentClass = ({ pad }) => {
    return css`
        flex-grow: 1;
    `;
};

const TopContentClass = ({ pad }) => {
    return css`
        display: flex;
        align-items: center;
        justify-content: center;

        @media screen and (max-width: ${MEDIUM_BREAK}) {
            padding-top: ${pad(6)}px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }
    `;
};

const BottomContentClass = () => {
    return css`
        display: flex;
        align-items: center;
        flex-direction: column;
    `;
};

const ToggleShowButton = () => {
    return css`
        font-size: 1rem;
    `;
};

const ContentClass = ({ pad }) => {
    return css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 400px;
        padding-left: ${pad(3)}px;
        padding-right: ${pad(3)}px;

        @media screen and (max-width: ${MEDIUM_BREAK}) {
            width: auto;
            padding-top: ${pad(6)}px;
        }
    `;
};

const ContentKindClass = () => {
    return css`
        display: flex;
        align-items: center;
        border-radius: 4px;
        overflow: hidden;
    `;
};

const ContentKindSelectClass = ({ theme }) => {
    return css`
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: 1px solid transparent;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;

        &:focus {
            outline: none;
            border: 1px solid ${theme.primary.main};
        }
    `;
};

const ContentKindArrowWrapperClass = ({ pad }) => {
    return css`
        display: flex;
        align-items: center;
        border: 1px solid transparent;
    `;
};

const ContentKindArrowClass = () => {
    return css`
        height: 1rem;
    `;
};

const ContentCommentClass = () => {
    return css`
        flex-grow: 1;
        border-radius: 4px;
        width: 100%;
    `;
};

const ContentCommentTextAreaClass = ({ theme, pad }) => {
    return css`
        border: 1px solid transparent;
        background: transparent;
        outline: none;
        width: 100%;
        resize: vertical;
        padding: ${pad(1)}px;
        border-radius: 4px;
        font-family: inherit;
        font-size: 1rem;

        &:focus {
            outline: none;
            border: 1px solid ${theme.primary.main};
        }
    `;
};

const ContentControlsClass = () => {
    return css`
        display: flex;
        justify-content: flex-end;
        width: 100%;
    `;
};

const RoomUserContent = ({ room }) => {
    const theme = useTheme();
    const { socket } = useSocket();
    const [drafting, setDrafting] = useState(false);
    const [kind, setKind] = useState("needs-improvement");
    const [value, setValue] = useState("");
    const [scale, setScale] = useState(1.5);
    const [showItems, setShowItems] = useState(false);

    const handleCancelDraft = () => {
        setValue("");
        setKind("needs-improvement");
        setDrafting(false);
    };

    const handleSubmitDraft = () => {
        socket.emit("room:submit", {
            id: room.id,
            item: {
                key: uuid(),
                kind: kind,
                comment: value,
                action: "",
            },
        });

        setValue("");
        setKind("needs-improvement");
        setDrafting(false);
    };

    const handleCreateNew = () => {
        setDrafting(true);
    };

    const handleChangeKind = (event) => {
        setKind(event.target.value);
    };

    const handleToggleShow = () => {
        setShowItems((show) => !show);
    };

    useEffect(() => {
        const handleLarge = () => {
            setScale(1.5);
        };
        const handleMedium = () => {
            setScale(1.0);
        };
        const handleSmall = () => {
            setScale(0.5);
        };

        const largeQuery = window.matchMedia(`(max-width: ${LARGE_BREAK})`);
        const mediumQuery = window.matchMedia(`(max-width: ${MEDIUM_BREAK})`);
        const smallQuery = window.matchMedia(`(max-width: ${SMALL_BREAK})`);

        largeQuery.addListener(handleLarge);
        mediumQuery.addListener(handleMedium);
        smallQuery.addListener(handleSmall);

        if (largeQuery.matches) {
            handleLarge();
        }

        if (mediumQuery.matches) {
            handleMedium();
        }

        if (smallQuery.matches) {
            handleSmall();
        }

        return () => {
            largeQuery.removeListener(handleLarge);
            mediumQuery.removeListener(handleMedium);
            smallQuery.removeListener(handleSmall);
        };
    }, []);

    let headingText;

    if (drafting) {
        headingText = "Create New Item";
    } else if (room.state.item) {
        headingText = "Feedback Discussion";
    } else {
        headingText = "Waiting For Owner";
    }

    return (
        <div className={RoomUserContentClass(theme)}>
            <Gap vertical size={6} />
            <div className={TopContentClass(theme)}>
                <Gachapon scale={scale} />
                <Gap horizontal size={6} />
                <div className={ContentClass(theme)}>
                    <H2>{headingText}</H2>
                    <Gap vertical size={2} />
                    {drafting ? (
                        <Fragment>
                            <Text as="label" className={ContentKindClass()}>
                                <Block
                                    as="select"
                                    name="kind"
                                    elevation={1}
                                    className={ContentKindSelectClass(theme)}
                                    padding={1}
                                    onChange={handleChangeKind}
                                    value={kind}
                                >
                                    <option value="needs-improvement">
                                        Needs Improvement
                                    </option>
                                    <option value="keep-doing">
                                        Keep Doing
                                    </option>
                                    <option value="compliment">
                                        Compliment
                                    </option>
                                </Block>
                                <Block
                                    padding={1}
                                    className={ContentKindArrowWrapperClass(
                                        theme
                                    )}
                                >
                                    <DropDownArrowIcon
                                        className={ContentKindArrowClass()}
                                    />
                                </Block>
                            </Text>
                            <Gap vertical size={1} />
                            <Block
                                padding={1}
                                className={ContentCommentClass()}
                            >
                                <textarea
                                    className={ContentCommentTextAreaClass(
                                        theme
                                    )}
                                    value={value}
                                    placeholder="I think we can improve on..."
                                    onChange={(event) =>
                                        setValue(event.target.value)
                                    }
                                />
                            </Block>
                            <Gap vertical size={2} />
                            <div className={ContentControlsClass()}>
                                <Button
                                    variant="outlined"
                                    onClick={handleCancelDraft}
                                >
                                    Cancel
                                </Button>
                                <Gap horizontal size={1} />
                                <Button
                                    onClick={handleSubmitDraft}
                                    disabled={
                                        value.trim() === "" ||
                                        value.length > 600
                                    }
                                >
                                    Submit
                                </Button>
                            </div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button onClick={handleCreateNew}>
                                Create New Item
                            </Button>
                            {room.state.item ? (
                                <Fragment>
                                    <Gap vertical size={6} />
                                    <UserItem item={room.state.item} />
                                </Fragment>
                            ) : null}
                        </Fragment>
                    )}
                </div>
            </div>
            <Gap vertical size={2} />
            <div className={BottomContentClass()}>
                <Button
                    variant="text"
                    className={ToggleShowButton()}
                    onClick={handleToggleShow}
                >
                    {showItems ? "Hide Items" : "Show Items"}
                </Button>
                {showItems ? (
                    <Fragment>
                        <Gap vertical size={4} />
                        <ItemsDisplay
                            items={room.state.items}
                            controls={false}
                        />
                    </Fragment>
                ) : null}
            </div>
        </div>
    );
};

export default RoomUserContent;
