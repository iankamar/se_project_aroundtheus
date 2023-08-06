import Modal from "../components/Modal.js";

export default class ModalWithForm extends Modal {
  constructor({ modalSelector, handleFormSubmit }) {
    super({ modalSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._inputList = [...this._modalForm.querySelectorAll(".modal__input")];
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => (formValues[input.name] = input.value));
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._modalForm.reset();
  }
}
