// This function shows an error message for an invalid input element
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(
    "#" + inputElement.id + "-Error"
  );
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

// This function hides the error message for a valid input element
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(
    "#" + inputElement.id + "-Error"
  );
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

// This function checks the validity of an input element and shows or hides the error message accordingly
function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

// Set a custom validation message for the name input
function setCustomValidationMessages() {
  const profileNameInput = document.getElementById("profileNameInput");
  const profileDescriptionInput = document.getElementById(
    "profileDescriptionInput"
  );

  profileNameInput.setCustomValidity(
    profileNameInput.value === "" ? "Please fill out the name field" : ""
  );
  profileDescriptionInput.setCustomValidity(
    profileDescriptionInput.value === ""
      ? "Please fill out the description field"
      : ""
  );
}

// Set a custom validation message for the title input
function setCustomValidationMessages() {
  const cardTitleInput = document.getElementById("cardTitleInput");
  const cardImageInput = document.getElementById("cardImageInput");

  cardTitleInput.setCustomValidity(
    cardTitleInput.value === "" ? "Please fill out the field" : ""
  );
  cardTitleInput.setCustomValidity(
    cardImageInput.value === "" ? "Please fill out the field" : ""
  );
}

// This function toggles the disabled state and the inactive class of the submit button based on the validity of the input elements
function toggleButtonState(inputList, submitButton, config) {
  let foundInvalid = false;
  inputList.forEach(function (input) {
    if (!input.validity.valid) {
      foundInvalid = true;
    }
  });

  submitButton.disabled = foundInvalid;
  if (submitButton.disabled) {
    submitButton.classList.add(config.inactiveButtonClass);
  } else {
    submitButton.classList.remove(config.inactiveButtonClass);
  }
}

// This function sets the event listeners for each input element and the submit button
function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const submitButton = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, submitButton, config);

  inputList.forEach(function (inputElement) {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, submitButton, config);
    });
  });
}

// This function enables the validation for all the forms in the document
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(function (formElement) {
    formElement.addEventListener("submit", function (e) {
      e.preventDefault();
    });

    setCustomValidationMessages();
    setEventListeners(formElement, config);
  });
}

const configObjects = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(configObjects);
