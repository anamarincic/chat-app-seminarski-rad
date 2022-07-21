import "./Navigation.styles.scss";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { useState } from "react";
import { Menu } from "../Menu";


export function Navigation(props){
    const [showMenu, setShowMenu] = useState(false);
    
    
    const handleClick = () => {
        setShowMenu(!showMenu);
    }

   const menu = showMenu === true;

    return (
      <div>
          <Button onClick={handleClick}>
              <Icon variant="menu"/>
          </Button>
          {menu && <Menu onClick={props.clearUser}/>}
      </div>
    );
}