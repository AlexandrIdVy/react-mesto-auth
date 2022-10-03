function PopupEditAvatar({avatar}) {
  return (
    <>
    <label className="popup__fieldset">
      <input type="url"
      className="popup__form-input popup__form-input_type_avatar-on"
      id="place-avatar"
      name="avatar"
      placeholder="Ссылка на картинку"
      required
      ref={avatar}
      />
      <span className="popup__form-input-error place-avatar-error"></span>
    </label>
    </>
  );
}

export default PopupEditAvatar;
