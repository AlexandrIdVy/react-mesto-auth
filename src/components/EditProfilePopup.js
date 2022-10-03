import React, { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
        name={'edit-profile'}
        title={'Редактировать профиль'}
        buttonText={'Сохранить'}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
      <>
      <label className="popup__fieldset">
        <input type="text"
        className="popup__form-input popup__form-input_type_name-on"
        id="profile-name"
        placeholder="Ваше имя?"
        name="name"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleChangeName} />
        <span className="popup__form-input-error profile-name-error"></span>
      </label>
      <label className="popup__fieldset">
        <input type="text"
        className="popup__form-input popup__form-input_type_description-on"
        id="profile-description"
        placeholder="Чем Вы занимаетесь?"
        name="about"
        required
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleChangeDescription} />
        <span className="popup__form-input-error profile-description-error"></span>
      </label>
      </>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
