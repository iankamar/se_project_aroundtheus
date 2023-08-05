// Import necessary modules and constants
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import {
  closeModalWindow,
  openModalWindow,
  addModalEventListener,
} from "../utils/utils.js";
import {
  config,
  initialCards,
  validationConfig,
  selectors,
  settings,
} from "../utils/constants.js";

import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";

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

// Function to fill the profile form
function fillProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

// Function to render a card using the Card class
function renderCard(cardData) {
  const card = new Card(cardData, "#cardTemplate", handlePreviewImage);
  const cardElement = card.getView();
  cardsWrap.prepend(cardElement);
}

// Event handler for profile form submission
function handleProfileFormSubmit(e) {
  e.preventDefault();

  if (!profileNameInput.value) {
    profileNameInput.select();
    return;
  }

  if (!profileDescriptionInput.value) {
    profileDescriptionInput.select();
    return;
  }

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  userInfo.setUserInfo({
    name: profileNameInput.value,
    description: profileDescriptionInput.value
  });

  closeModalWindow(profileEditModal);
}

// Event handler for card form submission
function handleCardFormSubmit(e) {
  e.preventDefault();

  const cardData = {
    name: cardTitleInput.value,
    link: cardImageInput.value,
  };

  renderCard(cardData);

  e.target.reset();
  closeModalWindow(cardAddModal);
  editCardValidator.resetValidation();
}

// Event handler for the like button
function handleLikeButton(e) {
  e.target.classList.toggle("card__like-button_active");
}

// Event handler for deleting a card
function handleDeleteCard(e) {
  e.target.closest(".card").remove();
}

// Event handler for previewing an image in a modal
function handlePreviewImage(cardData) {
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardCaption.textContent = cardData.name;

  openModalWindow(cardPreviewModal);
}

// Event listeners
profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  openModalWindow(profileEditModal);
});

profileCloseButton.addEventListener("click", () =>
  closeModalWindow(profileEditModal)
);

profileAddButton.addEventListener("click", () => openModalWindow(cardAddModal));
cardCloseButton.addEventListener("click", () => closeModalWindow(cardAddModal));
profileForm.addEventListener("submit", handleProfileFormSubmit);
cardAddModal.addEventListener("submit", handleCardFormSubmit);

addModalEventListener(profileEditModal, ["modal__close"]);
addModalEventListener(cardAddModal, ["modal__close"]);
addModalEventListener(cardPreviewModal, [
  "modal__wrapper",
  "modal__close-preview",
]);

// Initial rendering of cards
initialCards.forEach((cardData) => {
  renderCard(cardData);
});
