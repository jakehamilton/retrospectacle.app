import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { css } from "goober";
import { Block, Button, useTheme, Gap } from "@jakehamilton/ui";

const OwnerItemClass = ({ pad }) => {
    return css`
        width: 100%;
        max-width: 1024px;
        padding-left: ${pad(6)}px;
        padding-right: ${pad(6)}px;
    `;
};

const ItemClass = () => {
    return css`
        border-radius: 4px;
        overflow: hidden;
    `;
};

const ItemCommentClass = () => {
    return css``;
};

const ItemActionClass = () => {
    return css``;
};

const ItemActionTextAreaClass = ({ theme, pad }) => {
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

const ItemControlsClass = () => {
    return css`
        display: flex;
        justify-content: flex-end;
    `;
};

const OwnerItem = ({ item, onChangeActionItem }) => {
    const theme = useTheme();

    const [value, setValue] = useState(item.action || "");

    useEffect(() => {
        setValue(item.action || "");
    }, [item.key]);

    const handleSubmit = () => {
        onChangeActionItem({ item: item.key, action: value.trim() });
    };

    return (
        <div className={OwnerItemClass(theme)}>
            <div className={ItemClass()}>
                <Block
                    padding={2}
                    color="background.light"
                    className={ItemCommentClass()}
                >
                    {item.comment}
                </Block>
                <Block
                    padding={1}
                    color="background.dark"
                    className={ItemActionClass(theme)}
                    value={value}
                >
                    <textarea
                        className={ItemActionTextAreaClass(theme)}
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        placeholder="To solve this we should..."
                    />
                </Block>
            </div>
            <Gap vertical size={2} />
            <div className={ItemControlsClass()}>
                <Button onClick={handleSubmit} disabled={item.action === value}>
                    {item.action === ""
                        ? "Add Action Item"
                        : "Update Action Item"}
                </Button>
            </div>
        </div>
    );
};

export default OwnerItem;
