import Modal from "./Modal.js";

export default class ModalWithConfirmation extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super(modalSelector);
    this._submitButton = this._modal.querySelector(".modal__save");
    this._modalForm = this._modal.querySelector(".modal__form");
    this._delCardInput = this._modal.querySelector("#delCardId");
    this._handleFormSubmit = handleFormSubmit;
  }

  renderLoading(isLoading, loadingText='Deleting...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = 'Yes';
    }
  }

/*
  setApiCalling(isCalling) {
    this._submitButton.textContent = isCalling ? "Deleting ..." : "Yes";
  }
*/
  setDelCardId(id) {
    this._delCardInput.value = id;
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._delCardInput.value);
    });
  }
}

