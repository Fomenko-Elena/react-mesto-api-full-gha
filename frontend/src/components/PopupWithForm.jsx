import { useEffect, createRef } from "react"

function PopupWithForm(props) {
    const popupRef = createRef();

    function getClassName() {
        const baseClassName = `popup popup_type_${props.name}`
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
        if (props.isOpen) {
            setEventListeners();
         } else {
            removeEventListeners();
         }
    }, [props.isOpen]);

    return (
        <div ref={popupRef} className={getClassName()} onMouseDown={handleMouseDown}>
            <div className="popup__container">
                <button className="popup__close" type="button" onClick={props.onClose}></button>
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form" name={props.name} noValidate onSubmit={props.onSubmit}>
                    {props.children}
                    <button className="popup__submit" type="submit">{props.submitButtonText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm