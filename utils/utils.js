// Array of initial card data
export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Validation configuration
export const validationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button-disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Selectors for DOM elements
export const selectors = {
  cardList: ".cards__list",
  cardTemplate: "#cardTemplate",
  // Forms
  addForm: "#cardAddForm",
  editForm: "#profileEditForm",
  imageForm: "#avatarForm",
  // Profile Elements
  name: "#profileName",
  description: "#profileDescription",
  image: ".profile__image",
  // Buttons
  closeButtons: ".modal__close",
  editProfileButton: "#profileEditButton",
  addCardButton: "#profileAddButton",
};

// DOM element references
export const addCardButton = document.querySelector("#profileAddButton");
export const profileEditButton = document.querySelector("#profileEditButton");
export const addCloseButton = document.querySelector("#cardCloseButton");
export const addSaveButton = document.querySelector("#modalButton");
export const previewCloseButton = document.querySelector(
  "#modalCardPreviewCloseButton"
);
export const popupEditForm = document.querySelector("#profileEditForm");
export const profileEditModal = document.querySelector("#profileEditModal");
export const addCardForm = document.querySelector("#cardAddForm");
export const nameInputValue = document.querySelector("#profileNameInput");
export const professionInputValue = document.querySelector(
  "#profileDescriptionInput"
);
export const titleInputValue = document.querySelector("#cardTitleInput");
export const linkInputValue = document.querySelector("#cardImageInput");

export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
