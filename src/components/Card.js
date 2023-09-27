class Card {
  constructor(cardObject, templateSelector, userId, authorData, handleActions){
    this._card = cardObject;
    this._cardName = this._card.name;
    this._cardImage = this._card.link;
    this._cardSelector = templateSelector;
    this._userId = userId;
    this._cardId = authorData.cardId;
    this._authorId = authorData.authorId;
    this._cardZoom = handleActions.handleCardZoom;
    this._cardDelete = handleActions.handleCardDelete;
    this._putLike = handleActions.handleCardLike;
    this._removeLike = handleActions.handleCardDeleteLike;
  }

  _getCard(){
    return document.querySelector(this._cardSelector).content.querySelector('.cards__item').cloneNode(true);
  }

  deleteCard(){
    this._elementCard.remove();
    this._elementCard = null;
  }

  renderCardLike(card) {
    this._likes = card.likes;
    if (this._likes.length === 0) {
      this.likeSelector.textContent = '';
    } else {
      this.likeSelector.textContent = this._likes.length;
    }
    if (this._isLiked()) {
      this._likeIcon.classList.add('cards__like_active');
    } else {
      this._likeIcon.classList.remove('cards__like_active');
    }
  }
  _isLiked() {
    return this._likes.find((userLike) => userLike._id === this._userId);
  }
  _handleLikeClick() {
    if (this._isLiked()) {
      this._removeLike(this._cardId);
    } else {
      this._putLike(this._cardId);
    }
  };

  createCard() {
    this._elementCard = this._getCard();
    this._elementImages = this._elementCard.querySelector('.cards__image');
    this._elementName = this._elementCard.querySelector('.cards__description');
    this._likeIcon = this._elementCard.querySelector('.cards__like');
    this._deleteIcon = this._elementCard.querySelector('.cards__delete');
    this.likeCounter = this._elementCard.querySelector('.cards__like-counter')
    this._elementName.textContent = this._cardName;
    this._elementImages.src = this._cardImage;
    this._elementImages.alt = this._cardName;
    this.renderCardLike(this._card)
    this._addEventHandlers();
    return this._elementCard;
  }

  _addEventHandlers = () => {
    this._likeIcon.addEventListener('click', () => this._handleLikeClick());
    this._elementImages.addEventListener('click', () => this._cardZoom(this._cardName, this._cardImage));
    if(this._userId === this._authorId){
      this._deleteIcon.addEventListener('click', () => this._cardDelete(this, this._cardId));
    }else{
      this._deleteIcon.remove();
    }
  }
}

export { Card };
