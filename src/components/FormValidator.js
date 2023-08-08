// FormValidator.js
export default class FormValidator {

  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = [
      ...this._formElement.querySelectorAll(this._settings.inputSelector),
    ];
    this._submitButton = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
    this._setEventListeners();
  }

  // Enable submit button after validation
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }

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

  _hasInvalidInput() {
    // Check if any of the inputs is invalid
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState() {
      // Check if any of the inputs is invalid
    if (this._hasInvalidInput()) {
       // If yes, disable the button and add the inactive class
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
    } else {
      // if no, enable the button and remove the inactive class
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
    }
  }

  _setEventListeners() {
     // Loop through the inputs and add input event listeners
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        // Check the input validity and toggle the button state
        this._checkInputValidity(inputElement);
        // Toggle the button state
        this._toggleButtonState();
      });
    });
  }
// Public methods
  enableValidation() {
    // Prevent the default submit behavior of the form
    this._formElement.addEventListener("submit", (e) => e.preventDefault());
    // Add event listeners to the form elements
    this._setEventListeners();
    // Set initial button state
    this._toggleButtonState();
  }
}
