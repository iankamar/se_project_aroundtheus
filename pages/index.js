// Import necessary modules and constants
import FormValidator from "../components/FormValidator.js";
import { initialCards } from "../utils/utils.js";
import {
  closeModalWindow,
  openModalWindow,
  addModalEventListener,
} from "../utils/utils.js";
import { config } from "../utils/constants.js";

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
const profileSaveModal = document.querySelector("#profileSaveModal");
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

// Create form validators
const editProfileValidator = new FormValidator(config, profileForm);
editProfileValidator.enableValidation();
const editCardValidator = new FormValidator(config, cardAddModal);
editCardValidator.enableValidation();

// Card class
class Card {
  constructor(cardData) {
    this._cardData = cardData;
  }

  _getCardElement() {
    const cardElement = cardTemplate.content
      .querySelector(".card")
      .cloneNode(true);

    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    cardImage.src = this._cardData.link;
    cardImage.alt = this._cardData.name;
    cardTitle.textContent = this._cardData.name;

    likeButton.addEventListener("click", this._handleLikeButton.bind(this));
    deleteButton.addEventListener("click", this._handleDeleteCard.bind(this));
    cardImage.addEventListener("click", this._handlePreviewImage.bind(this));

    return cardElement;
  }

  _handleLikeButton(e) {
    e.target.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard(e) {
    e.target.closest(".card").remove();
  }

  _handlePreviewImage() {
    cardImage.src = this._cardData.link;
    cardImage.alt = this._cardData.name;
    cardCaption.textContent = this._cardData.name;

    openModalWindow(cardPreviewModal);
  }

  createCardElement() {
    this._cardElement = this._getCardElement();
    return this._cardElement;
  }
}

// Function to fill the profile form
function fillProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

// Function to render a card using the Card class
function renderCard(cardData) {
  const card = new Card(cardData);
  const cardElement = card.createCardElement();
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
