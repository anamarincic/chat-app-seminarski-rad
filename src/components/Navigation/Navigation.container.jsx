import { Navigation as Component} from "./Navigation.component";

import { useState } from "react";

export function Navigation(props){
    const [showMenu, setShowMenu] = useState(false);
    
    
    const handleClick = () => {
        setShowMenu(!showMenu);
    }

   const menu = showMenu === true;
   
  return (
    <Component 
      onClick={handleClick} 
      menu={menu} 
      clearUser={props.clearUser}
    />
   );
}