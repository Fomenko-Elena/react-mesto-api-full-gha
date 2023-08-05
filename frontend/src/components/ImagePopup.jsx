import { useEffect, createRef } from "react"

function ImagePopup(props) {
    const popupRef = createRef();

    function getClassName() {
        const baseClassName = "popup popup_preview"
        if (props.card != null) return `${baseClassName} popup_opened`
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
        if (props.card != null) {
            setEventListeners();
         } else {
            removeEventListeners();
         }
    }, [props.card]);

    return (
        <div ref={popupRef} className={getClassName()} onMouseDown={handleMouseDown}>
            <div className="popup__container popup__container_invisible">
                <button className="popup__close" type="button" onClick={props.onClose}></button>
                <figure className="popup__image-preview">
                    { props.card != null &&
                     (<> 
                        <img className="popup__image" src={props.card.link} alt={props.card.name}/>
                        <figcaption className="popup__image-title">{props.card.name}</figcaption>
                    </>)}
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup;