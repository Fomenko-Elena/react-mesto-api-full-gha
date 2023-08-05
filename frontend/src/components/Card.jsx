import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    function handleCardClick() {
        props.onCardClick(props.card);
    }

    function handleCardLike() {
        props.onCardLike(props.card);
    }

    function handleCardDelete() {
        props.onCardDelete(props.card);
    }
    
    return (
        <li className="element__item">
            <img className="element__picture" src={props.card.link} alt={props.card.name} onClick={handleCardClick}/>
            {isOwn && <button className="element__delete" type="button" onClick={handleCardDelete}></button> }
            <div className="element__block">
                <h2 className="element__text">{props.card.name}</h2>
                <div className="element__like">
                    <button 
                        className={`element__button ${isLiked && "element__button_actve"}`} 
                        type="button" 
                        onClick={handleCardLike}>
                    </button>
                    <span className="element__likes">{props.card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}

export default Card