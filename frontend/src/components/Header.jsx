import { Link, NavLink } from 'react-router-dom';
import headerLogoPath from './../images/logo.svg';
import { useEffect, useState } from 'react';

function Header(props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [isNavOpened, setNavOpened] = useState(false)

    function handleWindowResize() {
        setWindowWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])

    useEffect(() => {
        if (!isMobile() && isNavOpened || !props.email) setNavOpened(false)
    }, [windowWidth, props.email])

    function handleSignOut(e) {
        e.preventDefault()

        props.onSignOut()
    }

    function isMobile() {
        return windowWidth < 767
    }

    function toggleNavClick() {
        setNavOpened(!isNavOpened)
    }

    return (
        <header className="header">
            {isMobile() && isNavOpened && (
                <div className='header__top-navigation'>
                    <span className='header__email'>{props.email}</span>
                    <Link 
                        className='header__navlink header__navlink_visible header__navlink_dark' 
                        to='/sign-up' 
                        onClick={handleSignOut}
                    >Выйти</Link>
                </div>
            )}
            <div className="header__panel">
                <img className="header__logo" src={headerLogoPath} alt="Место" />
                <div className="header__navigation">
                    {!isMobile() && props.email && (
                        <>
                            <span className='header__email'>{props.email}</span>
                            <Link 
                                className='header__navlink header__navlink_visible header__navlink_dark' 
                                to='/sign-up' 
                                onClick={handleSignOut}
                            >Выйти</Link>
                        </>
                    )}
                    {isMobile() && props.email && (
                        <button
                            className={isNavOpened ? "header__nav-control header__nav-control_close" : "header__nav-control header__nav-control_open"}
                            onClick={toggleNavClick}
                        />
                    )}
                    {!props.email && (
                        <>
                            <NavLink
                                to="/sign-up"
                                className={({isActive}) => isActive ? "header__navlink" : "header__navlink header__navlink_visible"}
                            >
                                Регистрация
                            </NavLink>
                            <NavLink
                                to="/sign-in"
                                className={({isActive}) => isActive ? "header__navlink" : "header__navlink header__navlink_visible"}
                            >
                                Войти
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header;