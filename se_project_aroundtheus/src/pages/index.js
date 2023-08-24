// Token:"68a8781d-0ef6-4f31-8a00-f95473676b23"
// Import necessary modules and constants
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
//import constants
import {
  config,
  initialCards,
  validationConfig,
  selectors,
  settings,
  apiConfig,
  addCardButton,
  profileEditButton,
  profileImageEdit
} from "../utils/constants.js";

import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import Section from "../components/Section.js";
import Modal from "../components/Modal.js";
import Api from "../utils/Api.js";
import ModalWithConfirmation from "../components/ModalWithConfirmation.js";

// Instance of the UserInfo class
const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userDescriptionSelector: ".profile__description",
  userAvatarSelector: ".profile__image",
});

// Create an instance of the API class
const api = new Api(apiConfig);
let userId;
let cardSection;

const cardPreviewModal = new ModalWithImage(selectors.cardPreviewModal);
cardPreviewModal.setEventListeners();

// Create a function to create card instances
const card = (data) => {
  const card = new Card(
    {
      cardData: { ...data, userId },
      handleCardPreview: (imgData) => {
        cardPreviewModal.open(imgData);
      },
      handleDeleteClick: () => {
        deleteForm.open(() => {
          deleteForm.renderLoading(true);
          api
            .deleteCard(data._id)
            .then(() => {
              card.handleDelete();
              deleteForm.close();
            })
            .catch((err) =>
              console.log(`An error occurred when deleting card: ${err}`)
            )
            .finally(() => deleteForm.renderLoading(false));
        });
      },
      handleCardLike: () => {
        if (card.cardLiked()) {
          api
            .removeLike(data._id)
            .then((res) => {
              card.updateLikes(res.likes);
            })
            .catch((err) =>
              console.log(`An error occurred when removing a like: ${err}`)
            );
        } else {
          api
            .addLike(data._id)
            .then((res) => {
              card.updateLikes(res.likes);
            })
            .catch((err) =>
              console.log(`An error occurred when adding a like: ${err}`)
            );
        }
      },
      cardSelector: selectors.cardTemplate
    },

  );
  return card.getView();
};


const newUserInfo = new UserInfo({
  nameSelector: "#profileName",
  descSelector: "#profileDescription",
  avatarSelector: "#profileImage",
});

// get web server info, cards and user data.
api
  .getWebpageInfo()
  .then(([cardData, userData]) => {
    userId = userData._id;
    cardSection = new Section(
      {
        items: cardData,
        renderer: (data) => {
          const cardElement = card(data);
          cardSection.addItem(cardElement);
        },
      },
      ".cards"
    );
    cardSection.renderItems();
    newUserInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });
    newUserInfo.setAvatar(userData.avatar);
  })
  .catch((err) =>
    console.log(
      `An error occurred when loading initial user and card data: ${err}`
    )
  );

const cardAddForm = new ModalWithForm("#cardAddModal", (data) => {
  const newCard = { name: data['card-title-input'], link: data['card-image-input'] };
  api
    .addCard(newCard)
    .then((result) => {
      const cardElement = card(result);
      cardSection.addItem(cardElement);
      cardAddForm.close();
    })
    .catch((err) =>
      console.log(`An error occurred when loading new card data: ${err}`)
    )
});
cardAddForm.setEventListeners();

addCardButton.addEventListener("click", () => {
  addFormValidator._toggleButtonState();
  cardAddForm.open();
});
const addFormValidator = new FormValidator(
  validationConfig,
  selectors.addForm
);
addFormValidator.enableValidation();

const editProfileForm = new ModalWithForm("#profileEditModal", (data) => {
  api.getProfileInfo(data)
    .then(() => {
      newUserInfo.setUserInfo(data);
      editForm.close();
    })
    .catch((err) =>
      console.log(`An error occurred when loading user profile data: ${err}`)
    );
});
editProfileForm.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const { userName, userDescription } = newUserInfo.getUserInfo();
  profileNameInput.value = userName;
  profileDescriptionInput.value = userDescription;
  editProfileFormValidator._toggleButtonState();
  editProfileForm.open();
});
const editProfileFormValidator = new FormValidator(
  validationConfig,
  selectors.editForm
);
editProfileFormValidator.enableValidation();

const updateAvatarForm = new ModalWithForm(selectors.avatarModal, (data) => {
  const avatarLink = data.avatar;
  api
    .setProfileImage(avatarLink)
    .then((data) => {
      newUserInfo.setAvatar(avatarLink);
      updateAvatarForm.close();
    })
    .catch((err) =>
      console.log(`An error occured when loading avatar data: ${err}`)
    )
});
updateAvatarForm.setEventListeners();

const avatarFormValidator = new FormValidator(
  validationConfig,
  selectors.avatarForm
);
avatarFormValidator.enableValidation();
profileImageEdit.addEventListener("click", () => {
  avatarFormValidator._toggleButtonState();
  updateAvatarForm.open();
});


