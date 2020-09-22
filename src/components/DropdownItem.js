import React from "react";

const DropdownMenu = (props) => {

    if (!props.function) {

        return (
            <a href="#" className="menu-item" onClick={() => props.goToMenu && props.setActiveMenu(props.goToMenu)}>
                <span className="dropdown-button">{props.leftIcon}</span>
                
                {props.children}
                
                <span className="dropdown-right">{props.rightIcon}</span>
            </a>
        )
    } else {
        return (
            <a href="#" className="menu-item" onClick={() => props.function() && props.setActiveMenu('main')}>
                <span className="dropdown-button">{props.leftIcon}</span>
                
                {props.children}
                
                <span className="dropdown-right">{props.rightIcon}</span>
            </a>
        )       
    }

}

export default DropdownMenu