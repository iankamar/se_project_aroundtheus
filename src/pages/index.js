// index.js

// Import necessary modules and constants
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import {
  config,
  initialCards,
  validationConfig,
  selectors,
  settings,
} from "../utils/constants.js";

import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import Section from "../components/Section.js";
import Modal from "../components/Modal.js";

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

const profileForm = document.querySelector("#profileEditForm");
const profileAddButton = document.querySelector("#profileAddButton");
const cardTemplate = document.querySelector("#cardTemplate");
const cardAddModal = document.querySelector("#cardAddModal");
const cardCloseButton = document.querySelector("#cardCloseButton");
const cardTitleInput = document.querySelector("#cardTitleInput");
const cardImageInput = document.querySelector("#cardImageInput");
const cardPreviewModal = document.querySelector("#cardPreviewModal");
const cardPreviewCloseButton = document.querySelector(
  "#modalCardPreviewCloseButton"
);

const cardImage = cardPreviewModal.querySelector("#modalPreviewImage");
const cardCaption = cardPreviewModal.querySelector("#modalCaption");
const cardModalButton = cardPreviewModal.querySelector("#cardModalButton");

// Instance of the UserInfo class
const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userDescriptionSelector: ".profile__description",
  userImageSelector: ".profile__image",
});

// Create and enable form validators for editing profile and adding cards
const editProfileValidator = new FormValidator(config, profileForm);
editProfileValidator.enableValidation();
const editCardValidator = new FormValidator(config, cardAddModal);
editCardValidator.enableValidation();

// Create an instance of the Section class
const section = new Section(
  { items: initialCards, renderer: (item) => renderCard(item, section) },
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

// Function to fill the profile form
function fillProfileForm(profileNameInput, profileDescriptionInput) {
  const { userName, userDescription } = this.setUserInfo();
  profileNameInput.value = userName;
  profileDescriptionInput.value = userDescription;
}

/// Event handler for profile form submission
function handleProfileFormSubmit(inputValues) {
  console.log(inputValues);
  userInfo.setUserInfo(inputValues);

  // User's data into the inputs
  profileNameInput.value = inputValues["name"];
  profileDescriptionInput.value = inputValues["description"];

  modalWithFormInstance.close();
}

function handleCardFormSubmit(inputValues) {
  // Get input values from the form
  const cardTitle = inputValues["card-title-input"];
  const cardImage = inputValues["card-image-input"];

  // Card data object
  const cardData = {
    name: cardTitle,
    link: cardImage,
  };

  // Render the new card
  renderCard(cardData, section);

  // Close the card add modal
  cardFormModal.close();
}

// Event handler for previewing an image in a modal
function handlePreviewImage(cardData) {
  modalWithImageInstance.open(cardData);
}

// Event listeners
profileEditButton.addEventListener("click", () => {
  modalWithFormInstance.open();
});

// Event listeners
profileAddButton.addEventListener("click", () => {
  cardFormModal.open();
});
/*
// Event listener to the close button

const closeButton = document.querySelector("#cardPreviewModal");
closeButton.addEventListener("click", () => {
  modalWithImageInstance.close();
});
*/
// Instance of the ModalWithForm and ModalWithImage classes

const modalWithFormInstance = new ModalWithForm({
  modalSelector: "#profileEditModal",
  handleFormSubmit: handleProfileFormSubmit,
});

const cardFormModal = new ModalWithForm({
  modalSelector: "#cardAddModal",
  handleFormSubmit: handleCardFormSubmit,
});

const modalWithImageInstance = new ModalWithImage({
  modalSelector: "#cardPreviewModal",
  handleFormSubmit: handleCardFormSubmit,
});

modalWithFormInstance.setEventListeners();
modalWithImageInstance.setEventListeners();
cardFormModal.setEventListeners();
