import React, { useRef } from "react";
import PopupEditAvatar from "./PopupEditAvatar";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
        name={'edit-avatar'}
        title={'Обновить аватар'}
        buttonText={'Сохранить'}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <PopupEditAvatar
          avatar={avatarRef}
         />
      </PopupWithForm>
  );
}

export default EditAvatarPopup;
