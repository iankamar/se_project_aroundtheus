import Modal from "./Modal.js";

export default class ModalWithConfirmation extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
    this._submitButton = this._modal.querySelector(".modal__save");
    this._submitButtonText = this._submitButton.textContent;
    this._modalForm = this._modal.querySelector(".modal__form");
  }

  setSubmitText(submit, submitText = "Saving...") {
    if (submit) {
      this._submitButton.textContent = submitText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  confirmDelete(confirmation) {
    this._handleFormSubmit = confirmation;
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit();
    });
  }
}

