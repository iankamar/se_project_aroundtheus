//enabling validation by calling enableValidation
// pass all the settings on call
function setEventListeners(formElement, options) {
  const { inputSelector } = options;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      console.dir(inputElement.validity.valid);
    });
  });
}

function enableValidation(options) {
  const formElements = [...document.querySelectorAll("options.formSelector")];
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formElement, options);
    // look for all inputs inside of form
    // loop throuh all the inputs to see if all are vali
    // if input is not valid
    // get validation message
    // add error class to input
    // display error message
    // disable button
    // if all inputs are valid
    // enable button
    // reset error messages
  });
}

const config = {
  formSelector: "#cardAddForm",
  inputSelector: "#cardTitleInput",
  submitButtonSelector: "#modalButton",
  inactiveButtonClass: "#modalButton_disabled",
  inputErrorClass: "#modalInputError",
  errorClass: "#modalErrorVisible",
};

enableValidation(config);
