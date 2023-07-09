const profileEdit = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const popupCloseIcon = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('#username-input');
const descriptionInput = document.querySelector('#description-input');

const popupOpen = function (){
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

const popupClose = function (){
  popup.classList.remove('popup_opened');
}

const formSubmit = function (evt){
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  popupClose();
}

profileEdit.addEventListener('click', popupOpen);
popupCloseIcon.addEventListener('click', popupClose);
popup.addEventListener('submit', formSubmit);