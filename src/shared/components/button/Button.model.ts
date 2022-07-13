import { Icon } from "../../styles/models/icon";
import { Sizes } from "../../styles/models/size";
import { ThemeColor } from "../../styles/models/theme";

export interface ButtonProps extends Partial<React.HTMLAttributes<HTMLButtonElement>>  {
    variant?: ButtonVariant;
    disableShadow?: boolean;
    disabled?: boolean;
    startIcon?: Icon;
    endIcon?: Icon;
    size?: Sizes;
    color?: ThemeColor;
    label?: string;
}

type ButtonVariant = "default" | "text" | "outlined";
