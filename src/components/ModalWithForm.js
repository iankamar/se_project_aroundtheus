// ModalWithForm.js
import Modal from "../components/Modal.js";

export default class ModalWithForm extends Modal {

  constructor({ modalSelector, handleProfileFormSubmit, handleCardFormSubmit, inputList, modalForm}) {
    super(modalSelector);
    this._handleProfileFormSubmit = handleProfileFormSubmit;
    this._handleCardFormSubmit = handleCardFormSubmit;
    this._inputList = inputList;
    this._modalForm = modalForm;


  }

  // Private method: Get values from the form inputs
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => (formValues[input.name] = input.value));
    return formValues;
  }

  // Public method: Set input values in the form
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
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