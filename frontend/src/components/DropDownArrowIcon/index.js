import { h } from "preact";
import { css } from "goober";

const DropDownArrowIconClass = css`
    width: 32px;
    height: 32px;
    fill: currentColor;
`;

const DropDownArrowIcon = ({ ...props }) => {
    return (
        <svg class={DropDownArrowIconClass} viewBox="0 0 24 24" {...props}>
            <path d="M7 10l5 5 5-5z"></path>
        </svg>
    );
};

export default DropDownArrowIcon;
