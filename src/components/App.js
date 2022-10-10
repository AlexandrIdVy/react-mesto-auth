import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import PopupConfirm from './PopupConfirm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import * as Auth from '../utils/Auth.js';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
  const [currentUser, setСurrentUser] = useState({name: '', about: '', avatar: ''});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({email: ''});
  const [message, setMessage] = useState({message: ''});

  const history = useHistory();

  useEffect(() => {
      const jwt = localStorage.getItem('jwt');

      if (!jwt) return;

      Auth.getContent(jwt).then((data) => {
        setLoggedIn(true);
        setUserData({email: data.data.email});
        history.push("/")
      });
  }, [history]);

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
    setIsInfoTooltip(false);
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

  function handleSignIn(password, email, message) {
    return Auth.authorize(password, email)
            .then((data) => {
              if (!data.token) throw new Error('Отсутсвует токен для входа');

              localStorage.setItem('jwt', data.token);
              setLoggedIn(true);
              history.push("/");
            })
            .catch(err => {
              console.log(err);
              setIsInfoTooltip(true);
              setMessage({message: 'Что-то пошло не так!'});
            });
  }

  function handleRegister(password, email, message) {
    return Auth.register(password, email)
            .then(() => {
            history.push("/sign-in");
            setIsInfoTooltip(true);
            setMessage({message: 'Вы успешно зарегистрировались!'});
            })
            .catch(err => {
              console.log(err);
              setIsInfoTooltip(true);
              setMessage({message: 'Что-то пошло не так!'});
            });
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push("/sign-in");
  }

  return (
    <div className="page">
      <Switch>
        <Route path="/sign-up">
          <Header
            text={'Войти'}
            userData={''}
            loggedIn={loggedIn}
            path={'/sign-in'}
            onSignOut={''}
          />
          <Register
            onRegister={handleRegister}
            name={'register'}
            buttonText={'Зарегистрироваться'}
           />
          <InfoTooltip isOpen={isInfoTooltip} onClose={closeAllPopups} onMessage={message} />
        </Route>
        <Route path="/sign-in">
          <Header
            text={'Регистрация'}
            userData={''}
            loggedIn={loggedIn}
            path={'/sign-up'}
            onSignOut={''}
          />
          <Login
            onLogin={handleSignIn}
            name={'login'}
            buttonText={'Войти'}
          />
          <InfoTooltip isOpen={isInfoTooltip} onClose={closeAllPopups} onMessage={message} />
        </Route>
        <ProtectedRoute exact path="/" loggedIn={loggedIn}>
          <Header
            text={'Выйти'}
            userData={userData}
            loggedIn={loggedIn}
            path={'/sign-in'}
            onSignOut={handleSignOut}
          />
          <CurrentUserContext.Provider value={currentUser}>
            <CardsContext.Provider value={cards}>
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
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
        </Switch>
      <Footer />
    </div>
  );
}

export default App;
