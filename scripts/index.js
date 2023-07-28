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
const popupEditCloseIcon = popupEdit.querySelector('.popup__close');
const popupAddCloseIcon = popupAdd.querySelector('.popup__close');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const addInitialCards = () => {
  initialCards.forEach(card => cardsArea.append(addCards(card.name, card.link)));
}

const addCards = (name, link) => {
  const contentCardTemplate = document.querySelector('.template').content;
  const copyCardTemplate = contentCardTemplate.querySelector('.cards__item').cloneNode(true);

  copyCardTemplate.querySelector('.cards__description').textContent = name;
  copyCardTemplate.querySelector('.cards__image').src = link;

  return copyCardTemplate;
}

const popupOpen = function (popupName){
  popupName.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

const popupClose = function (popupName){
  popupName.classList.remove('popup_opened');
}

const formSubmit = function (evt){
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  popupClose(popupEdit);
}

const saveCard = function (evt){
  evt.preventDefault();
  cardsArea.prepend(addCards(nameCardInput.value, linkCardInput.value));
  popupClose(popupAdd);
}

addInitialCards();
profileEdit.addEventListener('click', () => popupOpen(popupEdit));
popupEditCloseIcon.addEventListener('click', () => popupClose(popupEdit));
addCard.addEventListener('click', () => popupOpen(popupAdd));
popupAddCloseIcon.addEventListener('click', () => popupClose(popupAdd));
popupEdit.addEventListener('submit', formSubmit);
popupAdd.addEventListener('submit', saveCard);