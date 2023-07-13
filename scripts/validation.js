//enabling validation by calling enableValidation
// pass all the settings on call
/*
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
  const formElements = [...document.querySelectorAll(options.formSelector)];
  formElements.forEach((formElement) => {
    // Listen for form submit event
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  });
}
*/
/*setEventListeners(formElement, options);
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

setEventListeners(formElement, options);
*/

// Function to handle event listeners for input elements
function setEventListeners(formElement, options) {
  // Add an event listener for the form element
  formElement.addEventListener("input", (event) => {
    // Check if the event target is an input element
    const inputElement = event.target;
    if (inputElement.matches(options.inputSelector)) {
      // Check the validity of the input and update the form validity state
      checkValidity(inputElement, formElement, options); // Changed this to pass the form element and options as arguments
    }
  });
}

// Function to check the validity of an input element
function checkValidity(inputElement, formElement, options) {
  // Added form element and options as parameters
  // Get the error message and the error element for the input
  const errorMessage = inputElement.validationMessage; // Moved this here to avoid repeating it in the if-else block
  const errorElement = inputElement.parentNode.querySelector(
    options.errorSelector // Removed string interpolation
  );

  // Set a custom validation message for the name input
  if (inputElement.id === "profileNameInput" && inputElement.value === "") {
    inputElement.setCustomValidity("Please fill out the name field");
  } else {
    inputElement.setCustomValidity("");
  }

  // Set a custom validation message for the description input
  if (
    inputElement.id === "profileDescriptionInput" &&
    inputElement.value === ""
  ) {
    inputElement.setCustomValidity("Please fill out the description field");
  } else {
    inputElement.setCustomValidity("");
  }

  // If input is not valid, show error message and add error styling
  if (!inputElement.validity.valid) {
    showError(inputElement, errorElement, errorMessage, options); // Changed this to pass the error element and message as arguments
  } else {
    // If input is valid, hide error message and remove error styling
    hideError(inputElement, errorElement, options); // Changed this to pass the error element as an argument
  }

  // Check the overall form validity and update the submit button state
  checkFormValidity(formElement, options); // Moved this here to avoid repeating it in every input event listener
}

// Function to check the overall form validity
function checkFormValidity(formElement, options) {
  // Get the submit button within the form
  const submitButton = formElement.querySelector(options.submitButtonSelector);

  // Check the validity of all input elements within the form
  const isFormValid = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  ).every((inputElement) => inputElement.validity.valid); // Changed this to use a simpler condition

  // Enable or disable the submit button based on the form validity state
  if (isFormValid) {
    // Changed this to use a simpler condition
    submitButton.classList.remove(options.inactiveButtonClass);
    submitButton.disabled = false;
  } else {
    submitButton.classList.add(options.inactiveButtonClass);
    submitButton.disabled = true;
  }
}

// Function to show error message for an input element
function showError(inputElement, errorElement, errorMessage, options) {
  // Added error element and message as parameters
  inputElement.classList.add(options.inputErrorClass); // Removed string interpolation
  errorElement.textContent = errorMessage; // Used the argument instead of calling inputElement.validationMessage again
  errorElement.classList.add(options.errorClass); // Removed string interpolation
}

// Function to hide error message for an input element
function hideError(inputElement, errorElement, options) {
  // Added error element as a parameter
  inputElement.classList.remove(options.inputErrorClass); // Removed string interpolation
  errorElement.textContent = ""; // Used the argument instead of calling inputElement.parentNode.querySelector again
  errorElement.classList.remove(options.errorClass); // Removed string interpolation
}

// Function to enable form validation
function enableValidation(options) {
  // Get all form elements based on the provided form selector
  const formElements = document.querySelectorAll(options.formSelector); // Removed string interpolation

  // Set up event listeners for each form element
  formElements.forEach((formElement) => {
    // Listen for form submit event
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    // Call setEventListeners function with the form element and options
    setEventListeners(formElement, options);
  });
}
