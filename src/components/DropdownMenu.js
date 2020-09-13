import React, { useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import DropdownItem from "./DropdownItem";

const DropdownMenu = () => {

    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);

    const dropdownRef = useRef(null);

    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])

    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height + 30)
    }

    return (
        <div className="dropdown" style={{height: menuHeight}}>
            <CSSTransition
                in={activeMenu === 'main'}
                unmountOnExit
                timeout={400}
                classNames="menu-primary"
                onEnter={calcHeight}
            >
                <div className="menu">

                    <DropdownItem>My Profile</DropdownItem>
                    <DropdownItem
                        setActiveMenu={setActiveMenu}
                        goToMenu="settings"
                        leftIcon={<i className="fas fa-cog"></i>}
                        rightIcon={<i className="fas fa-chevron-right"></i>}
                    >
                        Account
                    </DropdownItem>

                </div>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === 'settings'}
                unmountOnExit
                timeout={400}
                classNames="menu-secondary"
                onEnter={calcHeight}
            >

                <div className="menu">
                    <DropdownItem
                        setActiveMenu={setActiveMenu}
                        goToMenu="main"
                        leftIcon={<i className="fas fa-chevron-left"></i>}
                    >
                        Back
                    </DropdownItem>
                </div>

            </CSSTransition>
        </div>
    )

}


export default DropdownMenu