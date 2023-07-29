const profileEdit = document.querySelector('.profile__edit');
const addCard = document.querySelector('.profile__add');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const nameCardInput = popupAdd.querySelector('.popup__input_type_name');
const descriptionInput = popupEdit.querySelector('.popup__input_type_description');
const linkCardInput = popupAdd.querySelector('.popup__input_type_description');
const cardsArea = document.querySelector('.cards');
const popupZoom = document.querySelector('.popup_zoom');
const popupEditCloseIcon = popupEdit.querySelector('.popup__close');
const popupAddCloseIcon = popupAdd.querySelector('.popup__close');
const popupZoomCloseIcon = popupZoom.querySelector('.popup__close');

const addInitialCards = () => {
  initialCards.forEach(card => cardsArea.append(addCards(card.name, card.link)));
}

const addCards = (name, link) => {
  const contentCard = document.querySelector('.template').content;
  const copyCard = contentCard.querySelector('.cards__item').cloneNode(true);

  copyCard.querySelector('.cards__description').textContent = name;
  copyCard.querySelector('.cards__image').src = link;

  copyCard.querySelector('.cards__like').addEventListener('click', evt => evt.target.classList.toggle('cards__like_active'));

  copyCard.querySelector('.cards__delete').addEventListener('click', evt => evt.target.closest('.cards__item').remove());

  const openImage = () => {
    popupZoom.querySelector('.popup__description').textContent = name;
    popupZoom.querySelector('.popup__image').src = link;
    popupOpen(popupZoom);
  }

  copyCard.querySelector('.cards__image').addEventListener('click', openImage);

  return copyCard;
}

const popupOpen = popupName => {
  popupName.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

const popupClose = popupName => {
  popupName.classList.remove('popup_opened');
}

const formSubmit = evt => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  popupClose(popupEdit);
}

const saveCard = evt => {
  evt.preventDefault();
  cardsArea.prepend(addCards(nameCardInput.value, linkCardInput.value));
  nameCardInput.value = "";
  linkCardInput.value = "";
  popupClose(popupAdd);
}

addInitialCards();
profileEdit.addEventListener('click', () => popupOpen(popupEdit));
popupEditCloseIcon.addEventListener('click', () => popupClose(popupEdit));
addCard.addEventListener('click', () => popupOpen(popupAdd));
popupAddCloseIcon.addEventListener('click', () => popupClose(popupAdd));
popupZoomCloseIcon.addEventListener('click', () => popupClose(popupZoom));
popupEdit.addEventListener('submit', formSubmit);
popupAdd.addEventListener('submit', saveCard);