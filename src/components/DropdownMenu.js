import React, { useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import DropdownItem from "./DropdownItem";

const DropdownMenu = (props) => {

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

    const signedOutMenu = () => {
        return (
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
                        <p className="dropdown-text">Back</p>
                    </DropdownItem>

                    <DropdownItem
                        setActiveMenu={setActiveMenu}
                        goToMenu="main"
                        leftIcon={<i className="fas fa-sign-in-alt"></i>}
                        function={props.SignIn}
                    >
                        <p className="dropdown-text">Login</p>
                    </DropdownItem>
                </div>

            </CSSTransition>);
    }

    const signedInMenu = () => {
        return (
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
                        <p className="dropdown-text">Back</p>
                    </DropdownItem>
                    
                    <DropdownItem
                        setActiveMenu={setActiveMenu}
                        goToMenu="main"
                        leftIcon={<i className="fas fa-save"></i>}
                    >
                        <p className="dropdown-text">Save</p>
                    </DropdownItem>

                    <DropdownItem
                        setActiveMenu={setActiveMenu}
                        goToMenu="main"
                        leftIcon={<i className="fas fa-sign-out-alt"></i>}
                        function={props.SignOut}
                    >
                        <p className="dropdown-text">Logout</p>
                    </DropdownItem>
                </div>

            </CSSTransition>
        );
    }

    return (
        <div className="dropdown" style={{ height: menuHeight }}>
            <CSSTransition
                in={activeMenu === 'main'}
                unmountOnExit
                timeout={400}
                classNames="menu-primary"
                onEnter={calcHeight}
            >
                <div className="menu">

                    <DropdownItem
                        setActiveMenu={setActiveMenu}
                        leftIcon={<i className="fas fa-home"></i>}
                        rightIcon={<i className="fas fa-chevron-right"></i>}
                    >
                        <p className="dropdown-text">My Profile</p>
                    </DropdownItem>

                    <DropdownItem
                        setActiveMenu={setActiveMenu}
                        goToMenu="settings"
                        leftIcon={<i className="fas fa-cog"></i>}
                        rightIcon={<i className="fas fa-chevron-right"></i>}
                    >
                        <p className="dropdown-text">Account</p>
                    </DropdownItem>

                    <DropdownItem
                        leftIcon={<i className="fab fa-github"></i>}
                    >
                        <p className="dropdown-text">View Github Repo</p>
                    </DropdownItem>

                </div>
            </CSSTransition>

            {props.signedIn ? signedInMenu() : signedOutMenu() }
        </div>
    )

}

export default DropdownMenu