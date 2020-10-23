import { h } from "preact";
import cn from "classnames";
import { css } from "goober";
import { useTheme } from "@jakehamilton/ui";

const GachaponClass = ({ scale }) => {
    return css``;
};

const GachaponTopClass = ({ scale }) => {
    return css`
        position: relative;
        width: ${240 * scale}px;
        height: ${240 * scale}px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
    `;
};

const GachaponTopLidClass = ({ theme, scale }) => {
    const bowlSize = 240 * scale;
    const bowlRadius = bowlSize / 2;
    const lidHeight = 14 * scale;

    const lidTheta = Math.acos((bowlRadius - lidHeight) / bowlRadius);
    const lidWidth = bowlSize * lidTheta;

    return css`
        position: absolute;
        top: ${-2 * scale}px;
        left: 50%;
        transform: translateX(-50%) translateY(${2 * scale}px);
        background: ${theme.primary.main};
        width: ${lidWidth}px;
        height: ${lidHeight}px;
        border-top-left-radius: ${3 * scale}px;
        border-top-right-radius: ${3 * scale}px;
        z-index: 5;
    `;
};

const GachaponTopBowlClass = ({ scale }) => {
    return css`
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: ${240 * scale}px;
        height: ${240 * scale}px;
        background: rgba(255, 255, 255, 0.1);
        box-shadow: inset 2px 2px 20px -1px rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        overflow: hidden;
        z-index: 1;
    `;
};

const BOWL_SHELL_POSITIONS = {
    0: {
        x: "-250%",
        y: "0%",
        rotation: "-20deg",
    },
    1: {
        x: "-150%",
        y: "0%",
        rotation: "8deg",
    },
    2: {
        x: "-50%",
        y: "0%",
        rotation: "-16deg",
    },
    3: {
        x: "50%",
        y: "0%",
        rotation: "-3deg",
    },
    4: {
        x: "150%",
        y: "0%",
        rotation: "15deg",
    },
    5: {
        x: "-305%",
        y: "-90%",
        rotation: "28deg",
    },
    6: {
        x: "-205%",
        y: "-90%",
        rotation: "8deg",
    },
    7: {
        x: "-105%",
        y: "-90%",
        rotation: "23deg",
    },
    8: {
        x: "-5%",
        y: "-90%",
        rotation: "-14deg",
    },
    9: {
        x: "95%",
        y: "-90%",
        rotation: "-1deg",
    },
    10: {
        x: "195%",
        y: "-90%",
        rotation: "-19deg",
    },
};

const GachaponTopBowlShellClass = ({ scale, i }) => {
    const bottomClip = -40 * scale;
    const position = BOWL_SHELL_POSITIONS[i];

    return css`
        position: absolute;
        bottom: 0;
        left: 50%;
        width: ${40 * scale}px;
        height: ${40 * scale}px;

        /* prettier-ignore */
        transform: translateY(${bottomClip}px) translate(${position.x}, ${position.y}) rotate(${position.rotation});
    `;
};

const GachaponBottomClass = ({ theme, scale }) => {
    const bottomClip = -40 * scale;
    const bowlSize = 240 * scale;
    const bowlRadius = bowlSize / 2;

    const bottomTheta = Math.acos(
        (bowlRadius - Math.abs(bottomClip)) / bowlRadius
    );
    const bottomWidth = bowlSize * bottomTheta;

    return css`
        position: relative;
        margin-top: ${bottomClip - 14 * scale}px;
        margin-left: auto;
        margin-right: auto;
        width: ${bottomWidth}px;
        height: ${120 * scale}px;
        background: ${theme.primary.main};
        border-top-left-radius: ${2 * scale}px;
        border-top-right-radius: ${2 * scale}px;
        border-bottom-left-radius: ${3 * scale}px;
        border-bottom-right-radius: ${3 * scale}px;
        z-index: 2;
    `;
};

const GachaponBottomExitClass = ({ theme, scale }) => {
    return css`
        position: absolute;
        left: ${20 * scale}px;
        bottom: ${8 * scale}px;
        width: ${60 * scale}px;
        height: ${(120 * scale) / 2 + (56 * scale) / 2 - 8 * scale}px;
        background: ${theme.background.light};
        box-shadow: inset 0 4px 20px 4px rgba(0, 0, 0, 0.125);
        border-top-left-radius: ${4 * scale}px;
        border-top-right-radius: ${4 * scale}px;
    `;
};

const GachaponBottomHandleClass = ({ theme, scale }) => {
    return css`
        position: absolute;
        right: ${20 * scale + 8 * scale * 2}px;
        top: ${(120 * scale) / 2}px;
        transform: translateY(-50%);
        width: ${56 * scale}px;
        height: ${56 * scale}px;
        border-radius: 50%;
        background: ${theme.background.light};
        overflow: hidden;

        &:before {
            content: "";
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateY(-50%) translateX(7%);
            width: 100%;
            height: 150%;
            border-radius: 50%;
            box-shadow: inset 2px 0 20px 2px rgba(0, 0, 0, 0.1);
        }

        &:after {
            content: "";
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateY(-50%) translateX(-100%) translateX(-7%);
            width: 100%;
            height: 150%;
            border-radius: 50%;
            box-shadow: inset -2px 0 20px 2px rgba(0, 0, 0, 0.1);
        }
    `;
};

const GachaponBottomSlotClass = ({ theme, scale }) => {
    return css`
        position: absolute;
        right: ${20 * scale}px;
        top: ${(120 * scale) / 2}px;
        transform: translateY(-150%);
        width: ${4 * scale}px;
        height: ${28 * scale}px;
        background: ${theme.background.light};
    `;
};

const ShellClass = ({ scale }) => {
    return css`
        position: relative;
        width: ${70 * scale}px;
        height: ${70 * scale}px;
        border-radius: 50%;
        overflow: hidden;
    `;
};

const ShellContentClass = ({ scale }) => {
    return css`
        z-index: 1;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        box-shadow: inset 2px 2px 8px -2px rgba(0, 0, 0, 0.1);
    `;
};

const ShellBottomClass = ({ theme, scale }) => {
    return css`
        z-index: 2;
        position: absolute;
        width: 100%;
        height: 50%;
        left: 0;
        bottom: 0;
        background: linear-gradient(
            135deg,
            ${theme.secondary.light},
            ${theme.secondary.dark}
        );
    `;
};

const Gachapon = ({ scale = 1 }) => {
    const theme = useTheme();

    const shells = Array.from({ length: 11 }, (x, i) => {
        return (
            <div
                key={i}
                className={cn(
                    ShellClass({ ...theme, scale }),
                    GachaponTopBowlShellClass({ ...theme, scale, i })
                )}
            >
                <div className={ShellContentClass({ ...theme, scale })} />
                <div className={ShellBottomClass({ ...theme, scale, i })} />
            </div>
        );
    });

    return (
        <div className={GachaponClass({ ...theme, scale })}>
            <div className={GachaponTopClass({ ...theme, scale })}>
                <div className={GachaponTopLidClass({ ...theme, scale })} />
                <div className={GachaponTopBowlClass({ ...theme, scale })}>
                    {shells}
                </div>
            </div>
            <div className={GachaponBottomClass({ ...theme, scale })}>
                <div className={GachaponBottomExitClass({ ...theme, scale })} />
                <div
                    className={GachaponBottomHandleClass({ ...theme, scale })}
                />
                <div className={GachaponBottomSlotClass({ ...theme, scale })} />
            </div>
        </div>
    );
};

export default Gachapon;
