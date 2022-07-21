import "./Menu.styles.scss";

import { Button } from "../Button";
import { useUser } from "../../contexts/UserContext";

export function Menu(props){

    return (
        <div className="nav-menu" >
        <Button variant="text" onClick={props.onClick}>Log out</Button>
        </div>
    )
}