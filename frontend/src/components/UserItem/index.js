import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { css, keyframes } from "goober";
import { Block, Button, useTheme, Gap, Text, H5 } from "@jakehamilton/ui";

const UserItemClass = () => {
    return css`
        width: 100%;
    `;
};

const ItemAnimation = () => {
    return keyframes`
        from {
            opacity: 0;
            transform: translateY(2px);
        }

        to {
            opacity: 1;
            transform: translateY(0px);
        }
    `;
};

const ItemClass = () => {
    return css`
        border-radius: 4px;
        overflow: hidden;
        opacity: 0;
        transform: translateY(2px);
        animation: ${ItemAnimation()} 0.5s 0.8s ease forwards;
    `;
};

const ActionTitleClass = () => {
    return css`
        font-size: 0.8rem;
    `;
};

const UserItem = ({ item }) => {
    let title;

    switch (item.kind) {
        default:
        case "needs-improvement":
            title = "Needs Improvement";
            break;
        case "keep-doing":
            title = "Keep Doing";
            break;
        case "compliment":
            title = "Compliment";
            break;
    }

    return (
        <div className={UserItemClass()}>
            <div className={ItemClass()} key={item.key}>
                <Block padding={2} color="background.light">
                    <Text color="text" className={ActionTitleClass()}>
                        {title}
                    </Text>
                    <Gap vertical size={0.5} />
                    {item.comment}
                </Block>
                {item.action ? (
                    <Block padding={2} color="primary">
                        <Text
                            color="primary.text"
                            className={ActionTitleClass()}
                        >
                            Action Item
                        </Text>
                        <Gap vertical size={0.5} />
                        <Text color="primary.text">{item.action}</Text>
                    </Block>
                ) : null}
            </div>
        </div>
    );
};

export default UserItem;
