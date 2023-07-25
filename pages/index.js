// Import necessary modules and constants
import FormValidator from "../components/FormValidator.js";
import { initialCards } from "../utils/utils.js";
import {closeModalWindow,
openModalWindow,
addModalEventListener,} from "../utils/utils.js";

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

// Object configuration for form validation
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Create form validators
const editProfileValidator = new FormValidator(config, profileForm);
editProfileValidator.enableValidation();
const editCardValidator = new FormValidator(config, cardAddForm);
editCardValidator.enableValidation();

// Function to create a card element from card data
function getCardElement(cardData) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector("#cardImage");
  const cardTitle = cardElement.querySelector("#cardTitle");
  const likeButton = cardElement.querySelector("#cardLikeButton");
  const deleteButton = cardElement.querySelector("#cardDeleteButton");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  likeButton.addEventListener("click", handleLikeButton);
  deleteButton.addEventListener("click", handleDeleteCard);
  cardImage.addEventListener("click", () => handlePreviewImage(cardData));

  return cardElement;
}

// Function to fill the profile form
function fillProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

// Function to render a card
function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
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

  closeModalWindow(profileEditModal);
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
  toggleButtonState([cardTitleInput, cardImageInput], cardModalButton, config);
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
cardAddForm.addEventListener("submit", handleCardFormSubmit);

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
