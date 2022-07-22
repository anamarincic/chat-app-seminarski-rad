import { Button } from "../Button";
import { Icon } from "../Icon";
import { Menu } from "../Menu";

export function Navigation(props){
    return (
      <div className="navigation">
            <Button
                onClick={props.onClick}
            >
                <Icon variant="menu"/>
            </Button>
          {props.menu && <Menu onClick={props.clearUser}/>}
      </div>
    );
}