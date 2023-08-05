import { useEffect, createRef } from "react"
import successIconPath from './../images/success.svg';
import failIconPath from './../images/fail.svg';


function InfoTooltip(props) {
    const popupRef = createRef();

    function getClassName() {
        const baseClassName = "popup popup_tooltip"
        if (props.isOpen) return `${baseClassName} popup_opened`
        return baseClassName
    }

    function handleKeyUp(evt) {
        if (evt.code !== 'Escape') return;
        props.onClose();
    }

    function setEventListeners() {
        document.addEventListener('keyup', handleKeyUp);
    }

    function removeEventListeners() {
        document.removeEventListener('keyup', handleKeyUp);
    }

    function handleMouseDown(evt) {
        if (evt.target != popupRef.current) return;
        props.onClose();
    }

    useEffect(() => {
        if (props.isOpen != null) {
            setEventListeners();
         } else {
            removeEventListeners();
         }
    }, [props.card]);

    return (
        <div ref={popupRef} className={getClassName()} onMouseDown={handleMouseDown}>
            <div className="popup__container popup__container_invisible">
                <button className="popup__close" type="button" onClick={props.onClose}></button>
                <div className="popup__tooltip-container">
                    <img
                        className="popup__tooltip-icon"
                        src={props.isSuccess ? successIconPath : failIconPath} 
                        alt={props.isSuccess ? "Успешно" : "Ошибка"} />
                    <span className="popup__tooltip-text">{props.text}</span>
                </div>
            </div>
        </div>
    )}

export default InfoTooltip;