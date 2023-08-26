import { Card } from './Card.js';
import { objectListCard, classListForm } from './initialCards.js';
import { FormValidator } from './FormValidator.js';

const profileEditIcon = document.querySelector('.profile__edit');
const cardAddIcon = document.querySelector('.profile__add');
const popupProfile = document.querySelector('.popup_edit');
const popupCards = document.querySelector('.popup_add');
export const popupZoom = document.querySelector('.popup_zoom');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = popupProfile.querySelector('#username-input');
const nameCardInput = popupCards.querySelector('#place-name-input');
const descriptionInput = popupProfile.querySelector('#description-input');
const linkCardInput = popupCards.querySelector('#place-image-input');
const cardsArea = document.querySelector('.cards');
export const popupZoomDescription = popupZoom.querySelector('.popup__description');
export const popupZoomImage = popupZoom.querySelector('.popup__image');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupCardForm = popupCards.querySelector('.popup__form');
const popupAll = document.querySelectorAll('.popup');

const addInitialCards = () => {
  objectListCard.forEach(card => cardsArea.append(renderCard(card, '.template')));
}

const renderCard = (object, template) => {
  const card = new Card(object, template);
  return card.createCards();
}

const closePopupWithEsc = evt => {
  if (evt.key === 'Escape'){
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened);
  }
}

export const openPopup = popup => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWithEsc)
}

const openProfilePopup = () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupProfile);
}

const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEsc);
}

popupAll.forEach(popupElement => {
  popupElement.addEventListener('mousedown', evt => {
    if(evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')){
      closePopup(popupElement);
    }
  })
})

const handleProfileFormSubmit = evt => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupProfile);
}

const saveCardSubmit = evt => {
  evt.preventDefault();
  cardsArea.prepend(renderCard({
    name: nameCardInput.value,
    link: linkCardInput.value},
    '.template'));
  evt.target.reset();
  closePopup(popupCards);
  addCardValidate.disableSubmitButton();
}

addInitialCards();
const addCardValidate = new FormValidator(classListForm, popupCards);
addCardValidate.enableValidation();
const editProfileValidate = new FormValidator(classListForm, popupProfileForm);
editProfileValidate.enableValidation();
profileEditIcon.addEventListener('click', () => openProfilePopup());
cardAddIcon.addEventListener('click', () => openPopup(popupCards));
popupProfileForm.addEventListener('submit', handleProfileFormSubmit);
popupCardForm.addEventListener('submit', saveCardSubmit);


