function InfoTooltip({isOpen, onClose, onMessage}) {
  return (
    <div className={ `popup popup_type_info-tooltip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h2 className={`popup__title popup__title_type_info-tooltip`}>{onMessage.message}</h2>
        <button type="button" className="popup__close-btn button button_type_close" onClick={onClose} />
      </div>
    </div>
  );
}

export default InfoTooltip;
