const profileEditIcon = document.querySelector('.profile__edit');
const cardAddIcon = document.querySelector('.profile__add');
const popupProfile = document.querySelector('.popup_edit');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupCards = document.querySelector('.popup_add');
const nameInput = popupProfile.querySelector('#username-input');
const descriptionInput = popupProfile.querySelector('#description-input');
const formCards = popupCards.querySelector('.popup__form');
const popupAvatarEdit = document.querySelector('#avatar-popup');
const popupAvatarEditForm = popupAvatarEdit.querySelector('.popup__form');
const avatarEditIcon = document.querySelector('.profile__avatar-edit')

export {
  profileEditIcon, cardAddIcon, popupProfile, popupProfileForm, popupCards, nameInput, descriptionInput, formCards, popupAvatarEditForm, avatarEditIcon
}