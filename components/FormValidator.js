// formValidator.js

export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  // Private methods
  // Private method to show an error message (invalid input element)
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-Error`
    );
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._settings.errorClass);
    inputElement.classList.add(this._settings.inputErrorClass);
  }

  // Private method to hide the error message (valid input element)
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-Error`
    );
    errorElement.textContent = "";
    errorElement.classList.remove(this._settings.errorClass);
    inputElement.classList.remove(this._settings.inputErrorClass);
  }

  // Private method (check the validity of an input element and show/hide the error message)
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasValidInputs(inputList) {
    // Check if any of the inputs is valid
    return inputList.every((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    // Check if any of the inputs is invalid
    if (this._hasValidInputs(inputList)) {
      // If yes, disable the button and add the inactive class
      buttonElement.disabled = true;
      buttonElement.classList.add(this._settings.inactiveButtonClass);
    } else {
      // if no, enable the button and remove the inactive class
      buttonElement.disabled = false;
      buttonElement.classList.remove(this._settings.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    // Get all the inputs and the submit button from the form
    const inputList = [
      ...this._formElement.querySelectorAll(this._settings.inputSelector),
    ];
    const buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
    // Loop through the inputs and add input event listeners
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        //check the input validity and toogle the button state
        this._checkInputValidity(inputElement);
        //toggle the button
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  // Public methods
  enableValidation() {
    // Prevent the default submit behavior of the form
    this._formElement.addEventListener("submit", (e) => e.preventDefault());
    // Add event listeners to the form elements
    this._setEventListeners();
  }
}
