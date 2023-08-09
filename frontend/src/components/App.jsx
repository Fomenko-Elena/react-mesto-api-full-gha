import React, { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import { api } from "./../utils/Api";
import { logErrorHandler } from "../utils/utils";
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { noUser } from '../utils/constants'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ProtectedRouteElement from './ProtectedRoute'
import Login from './Login'
import Register from './Register'
import { auth } from './../utils/Auth'
import InfoTooltip from './InfoTooltip'

function App() {
    const [currentUser, setCurrentUser] = useState(noUser)
    const [cards, setCards] = useState([]);

    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null)
    const [preparedForDeleteCard, setPreparedForDeleteCard] = useState(null)
    const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false)
    const [infoTooltipText, setInfoTooltipText] = useState("")
    const [infoTooltipSuccess, setInfoTooltipSuccess] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        auth
            .getUser()
            .then((data) => {
                setCurrentUser(data);
                navigate('/', { replace: true })
            })
            .catch(logErrorHandler)
    }, [])

    useEffect(() => {
        if (currentUser === noUser) return;
        api
            .getInitialCards()
            .then((initialCards) => setCards(initialCards))
            .catch(logErrorHandler);
    }, [currentUser]);

    function closeAllPopups() {
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setSelectedCard(null);
        setPreparedForDeleteCard(null);
        setInfoTooltipOpen(false);
        setInfoTooltipText("");
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
    
        api
            .likeCard(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(logErrorHandler);
    }

    function handleCardDelete(card) {
        setPreparedForDeleteCard(card);
    }

    function handleConfirmation(e){
        e.preventDefault();

        if (preparedForDeleteCard != null) {
            handleConfirmedCardDelete(preparedForDeleteCard);
        } else {
            closeAllPopups();
        }
    }

    function handleConfirmedCardDelete(card) {
        api
            .removeCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
                closeAllPopups();
            })
            .catch(logErrorHandler);            
    }

    function handleUpdateUser(userData) {
        api
            .updateUser(userData)
            .then((user) => {
                setCurrentUser(user);
                closeAllPopups();
            })
            .catch(logErrorHandler);
    }

    function handleUpdateAvatar(avatarData) {
        api
            .updateAvatar(avatarData)
            .then((user) => {
                setCurrentUser(user);
                closeAllPopups();
            })
            .catch(logErrorHandler);
    }

    function handleAddPlace(placeData) {
        api
            .addCard(placeData)
            .then((card) => {
                setCards((state) => [card, ...state]);
                closeAllPopups();
            })
            .catch(logErrorHandler);
    }

    function handleRegister(registrationData) {
        auth
            .signUp(registrationData)
            .then((userData) => {
                return auth
                    .signIn(registrationData)
                    .then(() => userData)
            })
            .then((userData) => {
                setCurrentUser(userData);
                navigate('/', { replace: true })
                showSuccessRegistrationTooltip()
            })
            .catch((error) => {
                logErrorHandler(error)
                showFailureToolip()
            })
    }

    function handleLogin(loginData) {
        auth
            .signIn(loginData)
            .then(() => {
                return auth
                    .getUser()
                    .then((userData) => {
                        setCurrentUser(userData)
                        navigate('/', { replace: true })
                    })
            })
            .catch((error) => {
                logErrorHandler(error)
                showFailureToolip()
            })
    }

    function handeSignOut() {
        auth
            .signOut()
            .then(() => {
                setCurrentUser(noUser);
                navigate('/sign-in', { replace: true });
            })
            .catch(logErrorHandler);
    }

    function showFailureToolip() {
        setInfoTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
        setInfoTooltipSuccess(false);
        setInfoTooltipOpen(true);
    }

    function showSuccessRegistrationTooltip() {
        setInfoTooltipText("Вы успешно зарегистрировались!");
        setInfoTooltipSuccess(true);
        setInfoTooltipOpen(true);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header
                    email={currentUser.email}
                    onSignOut={handeSignOut}
                />

                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRouteElement
                                loggedIn={currentUser !== noUser}
                                component={Main}
                                cards={cards}   
                                onEditAvatar={() => setEditAvatarPopupOpen(true)}
                                onEditProfile={() => setEditProfilePopupOpen(true)}
                                onAddPlace={() => setAddPlacePopupOpen(true)}
                                onCardClick={(card) => setSelectedCard(card)}
                                onCardLike={(card) => handleCardLike(card)}
                                onCardDelete={(card) => handleCardDelete(card)}
                            />
                        }
                    />
                    <Route
                        path="/sign-up"
                        element={
                            <Register
                                onRegister={handleRegister}/>
                        }
                    />
                    <Route
                        path="/sign-in"
                        element={
                            <Login
                                onLogin={handleLogin}
                            />
                        }
                    />
                </Routes>

                <Footer/>

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <AddPlacePopup 
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlace}
                />

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

                <PopupWithForm
                    isOpen={preparedForDeleteCard !== null}
                    name="confirmationPopup"
                    title="Вы уверены?"
                    submitButtonText="Да"
                    onClose={closeAllPopups}
                    onSubmit={handleConfirmation}
                />

                <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    text={infoTooltipText}
                    isSuccess={infoTooltipSuccess}
                />
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App