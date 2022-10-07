import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from '../contexts/CardsContext';
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import PopupConfirm from "./PopupConfirm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import * as Auth from '../Auth.js';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
  const [currentUser, setСurrentUser] = useState({name: '', about: '', avatar: ''});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState({email: ''});

  const history = useHistory();

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    Promise.all([api.getUserMe(), api.getInitialCards()])
      .then(([dataUser, dataCards]) => {
        setСurrentUser(dataUser);
        setCards(dataCards);
      })
      .catch(err => console.log(err))
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({name: card.name, link: card.link});
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({name: '', link: ''});
  }

  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (isLiked) {
      api.removeLike(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
    }
    else {
      api.addLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => console.log(err));
    }

  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((cards) => {
        setCards((state) => state.filter((c) => c._id === card._id ? c = 0 : cards));
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser(dataUser) {
    api.sendDataUserMe(dataUser)
      .then(data => {
        setСurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(dataUser) {
    api.editAvatar(dataUser)
      .then(data => {
        setСurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    api.sendCard(card)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleSignIn(password, email) {
    return Auth.authorize(password, email)
      .then((data) => {
        if (!data.jwt) throw new Error('Missing jwt');

        localStorage.setItem('jwt', data.jwt);
        setLoggedIn(true);
        setEmail({email: data.user.email});
        history.push('/');
      });
  }

  function handleRegister(password, email) {
    return Auth.register(password, email).then(() => {
      history.push('/signin');
    });
  };

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/signin');
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) return;

    Auth.getContent(jwt).then((data) => {
      setLoggedIn(true);
      setEmail({email: data.email});
      history.push("/");
    });
  }

  return (
    <div className="page">
      <Header />
      <Switch>
        <Route path="/signin">
          <Login onLogin={handleSignIn} />
        </Route>
        <Route path="/signup">
          <Register onRegister={handleRegister} />
        </Route>
        <ProtectedRoute path="/" loggedIn={loggedIn}>
          <CurrentUserContext.Provider value={currentUser}>
            <CardsContext.Provider value={cards}>
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                email={email}
                onSignOut={handleSignOut}
              />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <PopupWithForm
            name={'confirm'}
            title={'Вы уверены?'}
            buttonText={'Да'}
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
          >
            <PopupConfirm />
          </PopupWithForm>
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
          </CardsContext.Provider>
          </CurrentUserContext.Provider>
        </ProtectedRoute>
        <Route>
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
