// Modal Window Functions with Keydown Event
function closeModalEscape(e) {
  if (e.key === "Escape" || e.code === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModalWindow(openedModal);
  }
}

function openModalWindow(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEscape);
}

function closeModalWindow(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEscape);
}

// Close a Modal Window by Clicking on Specific Elements
function addModalEventListener(modalElement, closeElements) {
  modalElement.addEventListener("mousedown", (e) => {
    if (
      e.target.classList.contains("modal") ||
      closeElements.some((element) => e.target.classList.contains(element))
    ) {
      closeModalWindow(modalElement);
    }
  });
}
// Export all utility functions together

export {
  closeModalEscape,
  openModalWindow,
  closeModalWindow,
  addModalEventListener,
};
