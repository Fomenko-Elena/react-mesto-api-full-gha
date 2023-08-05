import React, { useContext } from "react"
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
    const currentUser = useContext(CurrentUserContext);
    
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__picture">
                    <img
                        className="profile__avatar"
                        alt={currentUser.name}
                        src={currentUser.avatar}
                        onClick={props.onEditAvatar}
                    />
                    <div className="profile__overlay"></div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="profile__edit" type="button" onClick={props.onEditProfile}></button>
                    <p className="profile__job">{currentUser.about}</p>
                </div>
                <button className="profile__add" type="button" onClick={props.onAddPlace}></button>
            </section>

            <section className="element" aria-label="Фотографии">
                <ul className="element__list">
                    {props.cards.map(card => (
                        <Card 
                            key={card._id} 
                            card={card} 
                            onCardClick={props.onCardClick}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default Main