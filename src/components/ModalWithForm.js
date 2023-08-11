// ModalWithForm.js
import Modal from "../components/Modal.js";

export default class ModalWithForm extends Modal {
  constructor({ modalSelector, handleFormSubmit }) {
    super(modalSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._modalForm = this._modal.querySelector("form");
    this._inputList = this._modalForm.querySelectorAll(".modal__input");
  }

  // Private method: Get values from the form inputs
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => (formValues[input.name] = input.value));
    return formValues;
  }

  // Public method: Set input values in the form
  setInputValues(cardData) {
    this._inputList.forEach((input) => {
      input.value = cardData[input.name];
    });
  }

  // Override setEventListeners method from parent class
  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  // Override close method from parent class
  close() {
    super.close();
    this._modalForm.reset();
  }
}
