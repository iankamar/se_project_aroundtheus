// In constants.js

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

// Object configuration for form validation
export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Validation configuration
export const validationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__submit-button-disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Api config
export const apiConfig = {
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "68a8781d-0ef6-4f31-8a00-f95473676b23",
    "Content-Type": "application/json",
  },
};

// Selectors for DOM elements
export const selectors = {
  cardList: ".cards__list",
  cardTemplate: "#cardTemplate",
  // Forms
  addForm: "#cardAddForm",
  editForm: "#profileEditForm",
  avatarForm: "#updateAvatarForm",
  // Profile Elements
  name: "#profileName",
  description: "#profileDescription",
  image: ".profile__image",
  // Buttons
  closeButton: ".modal__close",
  editProfileButton: "#profileEditButton",
  addCardButton: "#profileAddButton",
  // Modal
  cardPreviewModal: "#cardPreviewModal",
  deleteModal: "#deleteCard",
  profileEditModal: "#profileEditModal",
  avatarModal: "#updateAvatarModal",
};

// DOM element references
// buttons
export const addCardButton = document.querySelector("#profileAddButton");
export const profileEditButton = document.querySelector("#profileEditButton");
export const addCloseButton = document.querySelector("#cardCloseButton");
export const addSaveButton = document.querySelector("#modalButton");
export const previewCloseButton = document.querySelector(
  "#modalCardPreviewCloseButton"
);
export const profileImageEdit = document.querySelector("#profileImageEdit");
export const profileCloseButton = document.querySelector("#profileCloseButton");
export const profileEditAvatar = document.querySelector("#profileEditImage");
export const profileNameInput = document.querySelector("#profileNameInput");
export const profileDescriptionInput = document.querySelector(
  "#profileDescriptionInput"
);

// modal
export const popupEditForm = document.querySelector("#profileEditForm");
export const profileEditModal = document.querySelector("#profileEditModal");
export const addCardForm = document.querySelector("#cardAddForm");
export const cardAddModal = document.querySelector("#cardAddModal");
export const nameInputValue = document.querySelector("#profileNameInput");
export const professionInputValue = document.querySelector(
  "#profileDescriptionInput"
);
export const titleInputValue = document.querySelector("#cardTitleInput");
export const linkInputValue = document.querySelector("#cardImageInput");

// user info
export const profileName = document.querySelector("#profileName");
export const profileDescription = document.querySelector("#profileDescription");
export const editProfileAvatar = document.querySelector("#profileImage");

export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
