function PopupAddPlace({link, name, onChangeName, onChangeLink}) {
  return (
    <>
    <label className="popup__fieldset">
      <input type="text"
      className="popup__form-input popup__form-input_type_place-on"
      id="name-place"
      placeholder="Название"
      name="name"
      required
      minLength="2"
      maxLength="30"
      value={name}
      onChange={onChangeName}
      />
      <span className="popup__form-input-error name-place-error"></span>
    </label>
    <label className="popup__fieldset">
      <input type="url"
      className="popup__form-input popup__form-input_type_link-on"
      id="place-link"
      name="link"
      placeholder="Ссылка на картинку"
      required
      value={link}
      onChange={onChangeLink}
      />
      <span className="popup__form-input-error place-link-error"></span>
    </label>
    </>
  );
}

export default PopupAddPlace;
