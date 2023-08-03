import Modal from "./Modal.js";

class ModalWithForm extends Modal {
  constructor({modalSelector, handleFormSubmit}) {
      super({modalSelector});
      this._modalForm = this._modalElement.querySelector['.modal__form'];
      this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this.modalForm.reset();
    super.close();
  }
}


// index.js

const newCardModal = new ModalWithForm('#cardAddModal', () => {});
newCardModal.open();

newCardModal.close();
