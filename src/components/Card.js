function Card({onCardClick, _id, name, link, likes, cardDeleteButtonAttribut, isLiked, onCardLike, onCardDelete}) {

  const cardLikeButtonClassName = (
    `place__like-btn button ${isLiked ? 'place__like-btn_active' : ''}`
  );

  function handleClick() {
    const card = { link: link, name: name };
    onCardClick(card);
  }

  function handleLikeClick() {
    const card = { likes: likes, _id: _id };
    onCardLike(card);
  }

  function handleDeleteClick() {
    const card = { _id: _id };
    onCardDelete(card);
  }

  return (
    <article className="place">
      <button type="button" className="place__trash-btn button" disabled={cardDeleteButtonAttribut} onClick={handleDeleteClick} />
      <img className="place__image" src={link} alt={name} onClick={handleClick} />
      <h2 className="place__title">{name}</h2>
      <div className="place__like">
        <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
        <span className={ `place__like-value ${(likes.length > 0) ? "place__like-value_type_on" : "place__like-value"}` }>
          {likes.length}
        </span>
      </div>
    </article>
  );
}

export default Card;
