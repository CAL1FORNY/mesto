const profileEditIcon = document.querySelector('.profile__edit');
const cardAddIcon = document.querySelector('.profile__add');
const popupProfile = document.querySelector('.popup_edit');
const popupCards = document.querySelector('.popup_add');
const popupZoom = document.querySelector('.popup_zoom');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = popupProfile.querySelector('#username-input');
const nameCardInput = popupCards.querySelector('#place-name-input');
const descriptionInput = popupProfile.querySelector('#description-input');
const linkCardInput = popupCards.querySelector('#place-image-input');
const cardsArea = document.querySelector('.cards');
const contentCard = document.querySelector('.template').content;
const popupZoomDescription = popupZoom.querySelector('.popup__description');
const popupZoomImage = popupZoom.querySelector('.popup__image');
const closeButtons = document.querySelectorAll('.popup__close');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupCardForm = popupCards.querySelector('.popup__form');
const popupAll = document.querySelectorAll('.popup');
const popupSubmit = popupCards.querySelector('.popup__submit');


const addInitialCards = () => {
  initialCards.forEach(card => cardsArea.append(createCards(card.name, card.link)));
}

const createCards = (name, link) => {
  const copyCard = contentCard.querySelector('.cards__item').cloneNode(true);
  const cardsImage = copyCard.querySelector('.cards__image');
  const cardsDescription = copyCard.querySelector('.cards__description');

  cardsDescription.textContent = name;
  cardsImage.src = link;
  cardsImage.alt = name;

  copyCard.querySelector('.cards__like').addEventListener('click', evt => evt.target.classList.toggle('cards__like_active'));

  copyCard.querySelector('.cards__delete').addEventListener('click', evt => evt.target.closest('.cards__item').remove());

  const openImage = () => {
    popupZoomDescription.textContent = name;
    popupZoomImage.src = link;
    popupZoomImage.alt = name;
    openPopup(popupZoom);
  }

  cardsImage.addEventListener('click', openImage);

  return copyCard;
}

const closePopupWithEsc = evt => {
  if (evt.key === 'Escape'){
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened);
  }
}

const openPopup = popup => {
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
  cardsArea.prepend(createCards(nameCardInput.value, linkCardInput.value));
  evt.target.reset();
  closePopup(popupCards);
  toggleButtonState(popupCardForm, popupSubmit, classListForm);
}

addInitialCards();
profileEditIcon.addEventListener('click', () => openProfilePopup());
cardAddIcon.addEventListener('click', () => openPopup(popupCards));
popupProfileForm.addEventListener('submit', handleProfileFormSubmit);
popupCardForm.addEventListener('submit', saveCardSubmit);
closeButtons.forEach((button) => {
  const buttonsPopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(buttonsPopup));
});

