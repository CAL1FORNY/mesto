const profileEditIcon = document.querySelector('.profile__edit');
const cardAddIcon = document.querySelector('.profile__add');
const popupProfile = document.querySelector('.popup_edit');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupCards = document.querySelector('.popup_add');
const nameCardInput = popupCards.querySelector('#place-name-input');
const linkCardInput = popupCards.querySelector('#place-image-input');
const nameInput = popupProfile.querySelector('#username-input');
const descriptionInput = popupProfile.querySelector('#description-input');
const formCards = popupCards.querySelector('.popup__form');

export {
  profileEditIcon, cardAddIcon, popupProfile, popupProfileForm, popupCards, nameCardInput, linkCardInput, nameInput, descriptionInput, formCards
}