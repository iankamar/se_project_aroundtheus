// Token:"68a8781d-0ef6-4f31-8a00-f95473676b23"
// Import necessary modules and constants

import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
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

// DOM elements
const cardsWrap = document.querySelector("#cardList");
const profileEditButton = document.querySelector("#profileEditButton");
const profileEditModal = document.querySelector("#profileEditModal");
const profileCloseButton = document.querySelector("#profileCloseButton");
const profileName = document.querySelector("#profileName");
const profileDescription = document.querySelector("#profileDescription");
const profileNameInput = document.querySelector("#profileNameInput");
const profileDescriptionInput = document.querySelector(
  "#profileDescriptionInput"
);
const profileAvatarEditLogo = document.querySelector("#profileAvatarEditLogo");

/*const profileForm = document.querySelector("#profileEditForm");*/
const profileAddButton = document.querySelector("#profileAddButton");
const cardAddButton = document.querySelector("#cardAddButton");
const cardTemplate = document.querySelector("#cardTemplate");
const cardAddModal = document.querySelector("#cardAddModal");
const cardCloseButton = document.querySelector("#cardCloseButton");
const cardTitleInput = document.querySelector("#cardTitleInput");
const cardImageInput = document.querySelector("#cardImageInput");
const cardPreviewModal = document.querySelector("#cardPreviewModal");
const cardPreviewCloseButton = document.querySelector(
  "#modalCardPreviewCloseButton"
);

const editProfileAvatar = document.querySelector("#profileImageEdit");
/*const updateProfileImage = document.querySelector("#updateProfileImage");*/

const cardImage = cardPreviewModal.querySelector("#modalPreviewImage");
const cardCaption = cardPreviewModal.querySelector("#modalCaption");
const cardModalButton = cardPreviewModal.querySelector("#cardModalButton");

// Instance of the UserInfo class
const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userDescriptionSelector: ".profile__description",
  userImageSelector: ".profile__image",
});

// Create an instance of the API class
const api = new Api(apiConfig);

let userId;
let section;

// Create and enable form validators for editing profile and adding cards
const editProfileValidator = new FormValidator(config, profileEditModal);
editProfileValidator.enableValidation();
const editCardValidator = new FormValidator(config, cardAddModal);
editCardValidator.enableValidation();
/*const updateProfileImageValidator = new FormValidator(
  config,
  updateProfileImage
);*/
/*updateProfileImageValidator.enableValidation();*/

// Fetch initial cards data from API
6;
api
  .getInitialCards()
  .then((cardData) => {
    // Create an instance of the Section class
    const section = new Section(
      { items: cardData, renderer: (item) => renderCard(item, section) },
      ".cards"
    );

    // Function to render a card using the Card class
    function renderCard(cardData, section) {
      const card = new Card(cardData, "#cardTemplate", handlePreviewImage);
      const cardElement = card.getView();
      section.addItem(cardElement);
    }

    // Render initial cards
    section.renderItems();
  })
  .catch((err) =>
    console.log(`An error occurred when loading initial cards data: ${err}`)
  );

// Modify the renderCard function to pass the userId parameter when creating a new Card instance
function renderCard(cardData, section) {
  const card = new Card(cardData, "#cardTemplate", handlePreviewImage, userId);
  const cardElement = card.getView();
  section.addItem(cardElement);
}

// Event handler for profile form submission
function handleProfileFormSubmit(inputValues) {
  console.log(inputValues);
  userInfo.setUserInfo(inputValues);
  profileEditModalInstance.close();
}

function fillProfileForm() {
  const { userName, userDescription } = userInfo.getUserInfo();
  // Set the input values in the profile form
  profileNameInput.value = userName;
  profileDescriptionInput.value = userDescription;
}

function handleCardFormSubmit(inputValues) {
  console.log(inputValues);
  // Get input values from the form
  const cardTitle = inputValues["card-title-input"];
  const cardImage = inputValues["card-image-input"];

  // Card data object
  const cardData = {
    name: cardTitle,
    link: cardImage,
  };

  // Close the card add modal
  cardFormModalInstance.close();
}

// Event handler for previewing an image in a modal
function handlePreviewImage(cardData) {
  cardPreviewModalInstance.open(cardData);
}

// Event listeners
profileEditButton.addEventListener("click", () => {
  editCardValidator.resetValidation();
  fillProfileForm();
  profileEditModalInstance.open();
});

// Event listeners
profileAddButton.addEventListener("click", () => {
  editCardValidator.resetValidation();
  cardFormModalInstance.open();
});

const profileEditModalInstance = new ModalWithForm({
  modalSelector: "#profileEditModal",
  handleFormSubmit: handleProfileFormSubmit,
});

const cardFormModalInstance = new ModalWithForm({
  modalSelector: "#cardAddModal",
  handleFormSubmit: handleCardFormSubmit,
});

const cardPreviewModalInstance = new ModalWithImage({
  modalSelector: "#cardPreviewModal",
  handleFormSubmit: handleCardFormSubmit,
});

profileEditModalInstance.setEventListeners();
cardFormModalInstance.setEventListeners();
cardPreviewModalInstance.setEventListeners();

// Create a function to create card instances
const cardData = (data) => {
  const card = new Card(
    {
      data: { ...data, userId },
      handlePreview: (imgData) => {
        previewCardModal.open(imgData);
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
  return cardData.generateCard();
};
6;
// Change Profile Picture
// Instance of the ModalWithForm class for updating profile picture
const updateProfileImage = new ModalWithForm({
  modalSelector: "#updateProfileImage",
  handleFormSubmit: (link) => {
    updateProfileImage.setLoading(true);
    Api.updateProfileImage({ avatar: link.url })
      .then((data) => {
        userInfo.setProfileImage(data.avatar);

        updateProfileImage.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        updateProfileImage.setLoading(false, "Save");
      });
  },
});
// Event listener for updating profile picture
editProfileAvatar.addEventListener("click", () => {
  updateProfileImage.open();
});

// Edit Profile
// Instance of the ModalWithForm class for editing user profile
const userInfoModal = new ModalWithForm({
  modalSelector: "#profileEditModal",

  handleFormSubmit: (Data) => {
    userInfoModal.setLoading(true);
    Api.editUserProfile(Data)
      .then((userInfo) => {
        userInfo.getUserInfo(/*userInfo.name, userInfo.description*/);

        userInfoModal.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        userInfoModal.setLoading(false, "Save");
      });
  },
});
