import "./Menu.styles.scss";

import { Button } from "../Button";

export function Menu(props){

    return (
      <div className="navigation-menu">
        <Button 
           variant="text"
           onClick={props.onClick}
        >
            Log out
        </Button>
      </div>
    );
}