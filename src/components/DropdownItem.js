import React from "react";

const DropdownMenu = (props) => {

    return (
        <a href="#" className="menu-item" onClick={() => props.goToMenu && props.setActiveMenu(props.goToMenu)}>
            <span className="dropdown-button">{props.leftIcon}</span>
            
            {props.children}
            
            <span className="dropdown-right">{props.rightIcon}</span>
        </a>
    )

}

export default DropdownMenu