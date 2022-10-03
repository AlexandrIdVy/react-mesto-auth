import React, { useState } from "react";
import PopupAddPlace from "./PopupAddPlace"
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name: name,
      link: link,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
        name={'add-place'}
        title={'Новое место'}
        buttonText={'Создать'}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <PopupAddPlace
          name={name}
          link={link}
          onChangeName={handleChangeName}
          onChangeLink={handleChangeLink}
        />
      </PopupWithForm>
  );
}

export default AddPlacePopup;
