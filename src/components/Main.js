import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);
  const cards = useContext(CardsContext);

  return (
    <main className="content">
    <section className="profile">
      <button type="button" className="profile__edit-avatar-btn button" onClick={onEditAvatar}>
        <img src={currentUser.avatar} alt={currentUser.name} className="profile__avatar" />
      </button>
      <div className="profile__info">
        <h1 className="profile__info-title">{currentUser.name}</h1>
        <p className="profile__info-subtitle">{currentUser.about}</p>
        <button type="button" className="profile__info-edit-btn button" onClick={onEditProfile} />
      </div>
      <button type="button" className="profile__add-btn button" onClick={onAddPlace} />
    </section>
    <section className="places">
        { cards ? cards.map(card =>
        (<Card
          key={card._id} {...card}
          onCardClick={onCardClick}
          cardDeleteButtonAttribut={!(card.owner._id === currentUser._id)}
          isLiked={card.likes.some(i => i._id === currentUser._id)}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
        />)) : null }
    </section>
    </main>
  );
}

export default Main;
