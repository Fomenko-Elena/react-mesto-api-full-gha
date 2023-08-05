import { useEffect, createRef, useContext } from "react"
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
    const avatarRef = createRef();
    const currentUser = useContext(CurrentUserContext);

    useEffect(()=> {
        avatarRef.current.value = currentUser.avatar;
    }, [currentUser, props.isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        
        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }

    return (
        <PopupWithForm
            name="editAvatarPopup"
            title="Обновить аватар"
            submitButtonText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input 
                ref={avatarRef}
                className="popup__input popup__input_edit_avatar" 
                name="avatar" 
                type="url" 
                placeholder="Ссылка на картинку" 
                required
            />
            <span className="popup__error avatar-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup