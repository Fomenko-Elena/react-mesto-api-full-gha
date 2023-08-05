import { useEffect, useState, useContext } from "react"
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = useState("")
    const [about, setAbout] = useState("")
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    },[currentUser, props.isOpen])

    function handleNameChange(e) {
        setName(e.target.value)
    }

    function handleAboutChange(e) {
        setAbout(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name: name,
            about: about
        })
    }

    return (
        <PopupWithForm
            name="editProfilePopup"
            title="Редактировать профиль"
            submitButtonText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input 
                className="popup__input popup__input_edit_name" 
                name="name" 
                type="text" 
                required 
                minLength="2" 
                maxLength="40" 
                value={name}
                onChange={handleNameChange}
            />
            <span className="popup__error name-error"></span>
            <input 
                className="popup__input popup__input_edit_about" 
                name="about" 
                type="text" 
                required 
                minLength="2" 
                maxLength="200" 
                value={about}
                onChange={handleAboutChange}
            />
            <span className="popup__error about-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup