/*
New cards don't appear in the DOM after submitting
The profile doesn't change after submitting
*/


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
  userImageSelector: ".profile__image"

});

// Create and enable form validators for editing profile and adding cards
const editProfileValidator = new FormValidator(config, profileForm);
editProfileValidator.enableValidation();
const editCardValidator = new FormValidator(config, cardAddModal);
editCardValidator.enableValidation();

// Create an instance of the Section class
const section = new Section({ items: initialCards, renderer: (item) => renderCard(item, section) }, ".cards");

function fillProfileForm() {
  const userInfoInstance = userInfo.getUserInfo();
  // Set the input values in the profile form
  profileNameInput.value = userInfoInstance.name;
  profileDescriptionInput.value = userInfoInstance.description;
}


// Function to render a card using the Card class
function renderCard(cardData, section) {
  const card = new Card(cardData, "#cardTemplate", handlePreviewImage);
  const cardElement = card.getView();
  section.addItem(cardElement);
}

// Render initial cards
section.renderItems();


/// Event handler for profile form submission
function handleProfileFormSubmit(inputValues) {
  console.log(inputValues);
  userInfo.setUserInfo(inputValues);

  modalWithImageInstance.close();
}

function handleCardFormSubmit(e) {
  e.preventDefault();

  const inputValues = cardForm._getInputValues();

  const cardData = {
    name: inputValues.cardTitleInput,
    link: inputValues.cardImageInput,
  };

  renderCard(cardData, section);
  modalWithImageInstance.close();
}

// Event handler for previewing an image in a modal
function handlePreviewImage(cardData) {
  modalWithImageInstance.open(cardData);
  cardTitleInput.value = cardData.name;
  cardImageInput.value = cardData.link;
}

// Event listeners
profileEditButton.addEventListener("click", () => {
  modalWithFormInstance.open(profileEditButton);
});


// Event listeners
profileAddButton.addEventListener("click", () => {
  cardFormModal.open(cardAddModal);
});


// Event listener to the close button
const closeButton = document.querySelector("#cardPreviewModal");
closeButton.addEventListener("click", () => {
  modalWithImageInstance.close();
});


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
