class Card {
  constructor(dataObject, templateElem, handleCardClick){
    this._name = dataObject.name;
    this._image = dataObject.link;
    this._template = templateElem;
    this._handleCardClick = handleCardClick;
  }

  _getCard(){
    return document.querySelector(this._template).content.querySelector('.cards__item').cloneNode(true);
  }

  _likeCard = evt => {
    evt.target.classList.toggle('cards__like_active');
  }

  _deleteCard(){
    this._elementCard.remove();
    this._elementCard = null;
  }

  createCards() {
    this._elementCard = this._getCard();
    this._elementImages = this._elementCard.querySelector('.cards__image');
    this._elementName = this._elementCard.querySelector('.cards__description');
    this._likeIcon = this._elementCard.querySelector('.cards__like');
    this._deleteIcon = this._elementCard.querySelector('.cards__delete');
    this._elementName.textContent = this._name;
    this._elementImages.src = this._image;
    this._elementImages.alt = this._name;
    this._addEventHandlers();
    return this._elementCard;
  }

  _addEventHandlers = () => {
    this._likeIcon.addEventListener('click', evt => this._likeCard(evt));
    this._deleteIcon.addEventListener('click', evt => this._deleteCard(evt));
    this._elementImages.addEventListener('click', () => this._handleCardClick(this._name, this._image));
  }
}

export { Card };
