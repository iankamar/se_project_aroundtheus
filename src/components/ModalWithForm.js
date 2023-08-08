// ModalWithForm.js
import Modal from "../components/Modal.js";

export default class ModalWithForm extends Modal {

  constructor({ modalSelector, handleFormSubmit, inputList, modalForm}) {
    super(modalSelector);
    this._handleFormSubmit = handleFormSubmit;
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
    // Call the parent class method to set basic event listeners
    super.setEventListeners();

    // Add submit event listener to the modal form
    this._modalForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Call the form submission handler with input values and close the modal
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  // Override close method from parent class
  close() {
    // Call the parent class method to close the modal
    super.close();

    // Reset the form when the modal is closed
    this._modalForm.reset();
  }
}