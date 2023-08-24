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


// Fetch initial cards data from API
api
  .getInitialCards()
  .then((cardData) => {
    // Create an instance of the Section class
    const cardSection = new Section(
      { items: cardData, renderer: (item) => renderCard(item, cardSection) },
      ".cards"
    );

    // Function to render a card using the Card class
    function renderCard(cardData, section) {
      const card = new Card(cardData, "#cardTemplate", handlePreviewImage);
      const cardElement = card.getView();
      cardSection.addCard(cardElement);
    }

    // Render initial cards
    cardSection.renderItems();
  })
  .catch((err) =>
    console.log(`An error occurred when loading initial cards data: ${err}`)
  );

const deleteForm = new ModalWithConfirmation(selectors.deleteModal);
deleteForm.setEventListeners();

// Create a function to create card instances
const card = (data) => {
  const card = new Card(
    {
      data: { ...data, userId },
      handleCardPreview: (imgData) => {
        previewPopup.open(imgData);
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
    },
    selectors.cardTemplate
  );
  return card.generateCard();
};

const cardPreviewModal = new ModalWithImage(selectors.cardPreviewModal);
cardPreviewModal.setEventListeners();

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
          cardSection.addItems(cardElement);
        },
      },
      ".cards__list"
    );
    cardSection.renderItems();
    newUserInfo.setUserInfo({
      name: userData.name,
      description: userData.description,
    });
    newUserInfo.setProfileImage(userData.avatar);
  })
  .catch((err) =>
    console.log(
      `An error occurred when loading initial user and card data: ${err}`
    )
  );

const cardAddForm = new ModalWithForm("#cardAddModal", (data) => {
  const newCard = { name: data.card-title-input, link: data.card-image-input };
  cardAddForm.renderLoading(true);
  api
    .addNewCard(newCard)
    .then((result) => {
      const newCardEl = card(result);
      cardSection.prependItem(newCardEl);
      cardAddForm.close();
    })
    .catch((err) =>
      console.log(`An error occurred when loading new card data: ${err}`)
    )
    .finally(() => cardAddForm.renderLoading(false));
});
cardAddForm.setEventListeners();
addCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  cardAddForm.open();
});
const addFormValidator = new FormValidator(
  validationConfig,
  selectors.addForm
);
addFormValidator.enableValidation();

const newUserInfo = new UserInfo({
  nameElement: profileName,
  descriptionElement: profileDescription,
  avatar: profileAvatar,
});

const editForm = new ModalWithForm(selectors.profileEditModal, (data) => {
  editForm.renderLoading(true);
  api
    .getProfileInfo(data.name, data.description)
    .then(() => {
      newUserInfo.setUserInfo(data);
      editForm.close();
    })
    .catch((err) =>
      console.log(`An error occurred when loading user profile data: ${err}`)
    )
    .finally(() => editForm.renderLoading(false));
});

editForm.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const { userName, userDescription } = newUserInfo.getUserInfo();
  profileNameInput.value = userName;
  profileDescriptionInput.value = userDescription;
  editForm.open();
});

const editFormValidator = new FormValidator(
  validationConfig,
  selectors.editForm
);
editFormValidator.enableValidation();

const updateAvatarForm = new PopupWithForm(selectors.avatarModal, (data) => {
  const avatarLink = data.avatar;
  updateAvatarForm.renderLoading(true);
  api
    .setProfileImage(avatarLink)
    .then((data) => {
      newUserInfo.setProfileImage(avatarLink);
      updateAvatarForm.close();
    })
    .catch((err) =>
      console.log(`An error occured when loading avatar data: ${err}`)
    )
    .finally(() => updateAvatarForm.renderLoading(false));
});

const avatarFormValidator = new FormValidator(
  validationConfig,
  selectors.avatarForm
);
avatarFormValidator.enableValidation();
profileImageEdit.addEventListener("click", () => {
  avatarFormValidator.toggleButtonState();
  updateAvatarForm.open();
});

updateAvatarForm.setEventListeners();
