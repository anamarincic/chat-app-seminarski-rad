import "./Icon.styles.scss";

import { ReactComponent as IconSend } from "../../assets/ic_baseline-send.svg";
import { ReactComponent as IconMenu } from "../../assets/menu-symbol-of-three-parallel-lines.svg";

export function Icon(props) {
  switch (props.variant) {
    case 'send': return <IconSend className="icon" />;
    case 'menu': return <IconMenu className="menu" />;
    default: return null;
  }
}
