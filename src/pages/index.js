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
/*const profileForm = document.querySelector["profile-edit-form"];*/
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
  /*profileNameInput.value = profileName.textContent;*/
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

  modalWithFormInstance.closeModalWindow(profileEditModal);

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
  modalWithImageInstance.closeModalWindow(cardAddModal);
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
  modalWithImageInstance.openModalWindow(cardPreviewModal);
}

// Event listeners
profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  modalWithFormInstance.openModalWindow(profileEditModal);
});


profileCloseButton.addEventListener("click", () =>
  modalWithFormInstance.closeModalWindow(profileEditModal)

);

// Initial rendering of cards
initialCards.forEach((cardData) => {
  renderCard(cardData);

});

// Instance of the ModalWithForm and ModalWithImage classes

const modalWithFormInstance = new ModalWithForm({
  modalSelector: profileEditModal,
  handleFormSubmit: handleProfileFormSubmit,
  inputList: profileEditModal.querySelectorAll(".modal__input"),
  modalForm: profileEditModal.querySelector(".modal__form"),
});

const modalWithImageInstance = new ModalWithImage(cardPreviewModal);

profileAddButton.addEventListener("click", () => modalWithImageInstance.openModalWindow(cardAddModal));
cardCloseButton.addEventListener("click", () => modalWithImageInstance.closeModalWindow(cardAddModal));
profileForm.addEventListener("submit", handleProfileFormSubmit);
cardAddModal.addEventListener("submit", handleCardFormSubmit);


modalWithFormInstance.addModalEventListener(profileEditModal, ["modal__close"]);
modalWithImageInstance.addModalEventListener(cardAddModal, ["modal__close"]);
modalWithImageInstance.addModalEventListener(cardPreviewModal, [
  "modal__wrapper",
  "modal__close-preview"
]);

