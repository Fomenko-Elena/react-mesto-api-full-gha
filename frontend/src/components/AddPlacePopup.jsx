import { useEffect, useState } from "react"
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup(props) {
    const [name, setName] = useState("")
    const [link, setLink] = useState("")

    useEffect(() => {
        setName("")
        setLink("")
    }, [props.isOpen])

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name: name,
            link: link
        })
    }

    return (
        <PopupWithForm
            name="appPlacePopup"
            title="Новое место"
            submitButtonText="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input 
                className="popup__input popup__input_edit_name" 
                name="name" 
                type="text" 
                placeholder="Название" 
                required 
                minLength="2" 
                maxLength="30" 
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <span className="popup__error name-error"></span>
            <input 
                className="popup__input popup__input_edit_link" 
                name="link" 
                type="url" 
                placeholder="Ссылка на картинку" 
                required 
                value={link}
                onChange={(e) => setLink(e.target.value)}
            />
            <span className="popup__error link-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup