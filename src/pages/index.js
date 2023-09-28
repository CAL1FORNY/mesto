import { Card } from "../components/Card.js";
import { classListForm } from "../utils/constants.js";
import { apiFindings } from "../utils/apiFindings.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupNotice } from "../components/PopupNotice.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

import "./index.css";

import {
  profileEditIcon,
  cardAddIcon,
  popupProfileForm,
  nameInput,
  descriptionInput,
  formCards,
  popupAvatarEditForm,
  avatarEditIcon,
} from "../utils/elements.js";

const api = new Api(apiFindings);
let userId;

const userInfo = new UserInfo({
  usernameSelector: ".profile__name",
  userDescriptionSelector: ".profile__description",
  userAvatarSelector: ".profile__avatar",
});

const createCard = function (cardData) {
  const cardItem = new Card(
    cardData,
    ".template",
    userId,
    { cardId: cardData._id, authorId: cardData.owner._id },
    {
      handleCardZoom: (name, image) => {
        popupImageZoom.open(name, image);
      },
      handleCardDelete: (elementCard, cardId) => {
        popupNoticeDelete.open(elementCard, cardId);
      },
      handleCardLike: (cardId) => {
        api.putCardLike(cardId)
          .then((res) => {
            cardItem.renderCardLike(res);
          })
          .catch((err) => {
            console.log(`При лайке карточки возникла ошибка, ${err}`);
          });
      },
      handleCardDeleteLike: (cardId) => {
        api.deleteCardLike(cardId)
          .then((res) => {
            cardItem.renderCardLike(res);
          })
          .catch((err) => {
            console.log(`При дизлайке карточки возникла ошибка, ${err}`);
          });
      },
    }
  );
  return cardItem.createCard();
};

const cardsSection = new Section(
  {
    renderer: (cardData) => {
      cardsSection.addItem(createCard(cardData));
    },
  },
  ".cards"
);

Promise.all([ api.getUserData(), api.getInitialCards() ])
  .then(([userProfileData, cards]) => {
    userId = userProfileData._id;
    userInfo.setUserInfo({
      username: userProfileData.name,
      description: userProfileData.about,
    });
    userInfo.setUserAvatar(userProfileData.avatar);
    cardsSection.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Возникла глобальная ошибка, ${err}`);
  });
const popupImageZoom = new PopupWithImage("#image-popup");
popupImageZoom.setEventListeners();
const popupEditAvatar = new PopupWithForm("#avatar-popup", {
  callbackFormSubmit: (userProfileData) => {
    popupEditAvatar.putSavingProcess();
    api
      .sendAvatarData(userProfileData)
      .then((res) => {
        userInfo.setUserAvatar(res.avatar);
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(`При обновлении аватара произошла ошибка, ${err}`);
      })
      .finally(() => {
        popupEditAvatar.returnSavingProcess();
      });
  },
});
popupEditAvatar.setEventListeners();

const popupNoticeDelete = new PopupNotice("#delete-card", {
  callbackNotice: (elementCard, cardId) => {
    api.deleteCard(cardId)
      .then(() => {
        elementCard.deleteCard();
        popupNoticeDelete.close();
      })
      .catch((err) => {
        console.log(`При удалении карточки возникла ошибка, ${err}`);
      });
  },
});
popupNoticeDelete.setEventListeners();

const popupEditProfile = new PopupWithForm(".popup_edit", {
  callbackFormSubmit: (userProfileData) => {
    popupEditProfile.putSavingProcess();
    api.sendUserData(userProfileData)
      .then((res) => {
        userInfo.setUserInfo({ username: res.name, description: res.about });
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(`При редактировании профиля возникла ошибка, ${err}`);
      })
      .finally(() => {
        popupEditProfile.returnSavingProcess();
      });
  },
});
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm(".popup_add", {
  callbackFormSubmit: (formValues) => {
    popupAddCard.putSavingProcess();
    api.addNewCard({ name: formValues.placename, link: formValues.placeimage })
      .then((card) => {
        cardsSection.prependItem(createCard(card));
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(`При добавлении новой карточки возникла ошибка, ${err}`);
      })
      .finally(() => {
        popupAddCard.returnSavingProcess();
      });
  },
});
popupAddCard.setEventListeners();

const cardItemValidate = new FormValidator(classListForm, formCards);
cardItemValidate.enableValidation();
const profileEditValidate = new FormValidator(classListForm, popupProfileForm);
profileEditValidate.enableValidation();
const profileAvatarEditValidate = new FormValidator(
  classListForm,
  popupAvatarEditForm
);
profileAvatarEditValidate.enableValidation();

profileEditIcon.addEventListener("click", function () {
  popupEditProfile.open();
  profileEditValidate.resetValidate();
  const newUserInfo = userInfo.getUserInfo();
  nameInput.value = newUserInfo.username;
  descriptionInput.value = newUserInfo.description;
});

avatarEditIcon.addEventListener("click", function () {
  popupEditAvatar.open();
  profileAvatarEditValidate.resetValidate();
});

cardAddIcon.addEventListener("click", function () {
  popupAddCard.open();
  cardItemValidate.resetValidate();
});

