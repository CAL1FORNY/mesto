import { Card } from '../components/Card.js';
import { objectListCard, classListForm } from '../components/utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

import './index.css';

import { profileEditIcon, cardAddIcon, popupProfileForm, nameInput, descriptionInput, formCards }
from '../components/utils/elements.js';

const popupImageZoom = new PopupWithImage('#image-popup');
popupImageZoom.setEventListeners();

const userInfo = new UserInfo({
  usernameSelector: '.profile__name',
  userDescriptionSelector: '.profile__description'
});

const popupEditProfile = new PopupWithForm('.popup_edit', {
  callbackFormSubmit: (profileData) => {
    userInfo.setUserInfo({
      username: profileData.username,
      description: profileData.description
    });
    popupEditProfile.close();
  }
});
popupEditProfile.setEventListeners();

const handleCardClick = function (name, image) {
  popupImageZoom.open(name, image);
};

const renderCard = function (cardData) {
  const renderCardItem = new Card(cardData, '.template', handleCardClick);
  return renderCardItem.createCards();
}

const addInitialCards = new Section({
  items: objectListCard,
  renderer: (cardData) => {
    addInitialCards.addItem(renderCard(cardData));
  }
}, '.cards');
addInitialCards.renderItems();

const popupAddCard = new PopupWithForm('.popup_add', {
  callbackFormSubmit: (formValues) => {
    addInitialCards.addItem(renderCard({
      name: formValues.placename,
      link: formValues.placeimage
    }));
    popupAddCard.close();
  }
});
popupAddCard.setEventListeners();

const addCardValidate = new FormValidator(classListForm, formCards);
addCardValidate.enableValidation();

const editProfileValidate = new FormValidator(classListForm, popupProfileForm);
editProfileValidate.enableValidation();

profileEditIcon.addEventListener('click', function () {
  popupEditProfile.open();
  const newUserInfo = userInfo.getUserInfo();
  nameInput.setAttribute('value', newUserInfo.username);
  descriptionInput.setAttribute('value', newUserInfo.description);
});

cardAddIcon.addEventListener('click', function () {
  popupAddCard.open();
  addCardValidate.disableSubmitButton();
});


