function ImagePopup({card, onClose}) {
  return (
    <div className={ `popup popup_type_image-place ${card.link ? "popup_opened" : ""}`}>
      <figure className="popup__image-container">
        <button type="button" className="popup__close-btn button button_type_close-viewing" onClick={onClose} />
        <img className="popup__image" src={card.link} alt={card.name} />
        <figcaption className="popup__image-caption">{card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
