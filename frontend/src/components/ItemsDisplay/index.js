import { h, Fragment } from "preact";
import { useMemo } from "preact/hooks";
import { css } from "goober";
import {
    useTheme,
    Gap,
    Text,
    H3,
    Block,
    Tooltip,
    Button,
} from "@jakehamilton/ui";
import useSocket from "../../hooks/useSocket";

const ItemColumnClass = ({ pad }) => {
    return css`
        flex-shrink: 0;
        width: 340px;
        margin-left: ${pad(3)}px;
        margin-right: ${pad(3)}px;

        @media screen and (max-width: 1200px) {
            margin-bottom: ${pad(6)}px;
        }
    `;
};

const ColumnTitleClass = () => {
    return css``;
};

const ColumnItemsClass = () => {
    return css``;
};

const ColumnItemClass = () => {
    return css`
        border-radius: 4px;
        overflow: hidden;
    `;
};

const ColumnItemControlsClass = ({ pad }) => {
    return css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: nowrap;
        padding: ${pad(2)}px;
        padding-bottom: ${pad(1)}px;
    `;
};

const ColumnItemReadIconClass = ({ item, theme }) => {
    return css`
        width: 12px;
        height: 12px;
        background: ${item.shown ? theme.background.dark : theme.primary.main};
        border-radius: 50%;
    `;
};

const ItemControlsLeft = () => {
    return css``;
};

const ItemControlsRight = () => {
    return css``;
};

const ColumnItemCommentClass = ({ pad }) => {
    return css`
        padding: ${pad(2)}px !important;
        padding-top: ${pad(1)}px !important;
    `;
};

const ColumnItemActionClass = ({ theme, pad }) => {
    return css``;
};

const ItemColumn = ({ items, category, onShow, onDelete, controls }) => {
    const theme = useTheme();
    const { socket, user } = useSocket();

    return (
        <div className={ItemColumnClass(theme)}>
            <div className={ColumnTitleClass()}>
                <H3>{category}</H3>
            </div>
            <div className={ColumnItemsClass()}>
                {items.map((item) => {
                    return (
                        <Fragment>
                            <Gap vertical size={2} />
                            <Block key={item.key} className={ColumnItemClass()}>
                                {controls ? (
                                    <div
                                        className={ColumnItemControlsClass(
                                            theme
                                        )}
                                    >
                                        <div className={ItemControlsLeft()}>
                                            <Tooltip
                                                placement="top"
                                                delay={100}
                                                text={
                                                    item.shown
                                                        ? "Already Shown"
                                                        : "Not Shown Yet"
                                                }
                                            >
                                                <div
                                                    className={ColumnItemReadIconClass(
                                                        {
                                                            ...theme,
                                                            item,
                                                        }
                                                    )}
                                                />
                                            </Tooltip>
                                        </div>
                                        <div className={ItemControlsRight()}>
                                            <Button
                                                variant="text"
                                                onClick={() => {
                                                    onDelete(item.key);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                variant="filled"
                                                onClick={() => {
                                                    onShow(item.key);
                                                }}
                                            >
                                                Show
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <Gap vertical size={1} />
                                )}
                                <Block
                                    color="background.light"
                                    className={ColumnItemCommentClass(theme)}
                                >
                                    {item.comment}
                                </Block>
                                {item.action === "" ? null : (
                                    <Block
                                        padding={2}
                                        color="primary"
                                        className={ColumnItemActionClass(theme)}
                                    >
                                        <Text color="primary.text">
                                            {item.action}
                                        </Text>
                                    </Block>
                                )}
                            </Block>
                            <Gap vertical size={2} />
                        </Fragment>
                    );
                })}
            </div>
        </div>
    );
};

const ItemsDisplayClass = ({ pad }) => {
    return css`
        display: flex;
        align-items: stretch;
        justify-content: center;
        flex-wrap: wrap;
        padding-left: ${pad(1)}px;
        padding-right: ${pad(1)}px;
    `;
};

const ItemsDisplay = ({ items, onShow, onDelete, controls = true }) => {
    const theme = useTheme();

    const sortedItems = useMemo(() => {
        const sortedItems = items.reduce(
            (sorted, item) => {
                switch (item.kind) {
                    default:
                    case "needs-improvement":
                        sorted.needsImprovement.push(item);
                        break;
                    case "keep-doing":
                        sorted.keepDoing.push(item);
                        break;
                    case "compliment":
                        sorted.compliment.push(item);
                        break;
                }

                return sorted;
            },
            {
                needsImprovement: [],
                keepDoing: [],
                compliment: [],
            }
        );

        return sortedItems;
    }, [items]);

    return (
        <div className={ItemsDisplayClass(theme)}>
            <ItemColumn
                items={sortedItems.needsImprovement}
                category="Needs Improvement"
                onShow={onShow}
                onDelete={onDelete}
                controls={controls}
            />
            <ItemColumn
                items={sortedItems.keepDoing}
                category="Keep Doing"
                onShow={onShow}
                onDelete={onDelete}
                controls={controls}
            />
            <ItemColumn
                items={sortedItems.compliment}
                category="Compliments"
                onShow={onShow}
                onDelete={onDelete}
                controls={controls}
            />
        </div>
    );
};

export default ItemsDisplay;
