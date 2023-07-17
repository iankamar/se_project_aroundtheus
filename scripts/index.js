const initialCards = [
  // Array of initial card data

  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// DOM elements

const cardsWrap = document.querySelector("#cardList");
const profileEditButton = document.querySelector("#profileEditButton");
const profileEditModal = document.querySelector("#profileEditModal");
const profileCloseButton = document.querySelector("#profileCloseButton");
const profileName = document.querySelector("#profileName");
const profileDescription = document.querySelector("#profileDescription");
const profileNameInput = document.querySelector("#profileNameInput");
const profileDescriptionInput = document.querySelector(
  "#profileDescriptionInput"
);
const profileForm = document.querySelector("#profileEditForm");
const profileAddButton = document.querySelector("#profileAddButton");
const cardTemplate = document.querySelector("#cardTemplate");
const cardAddModal = document.querySelector("#cardAddModal");
const cardCloseButton = document.querySelector("#cardCloseButton");
const cardTitleInput = document.querySelector("#cardTitleInput");
const cardImageInput = document.querySelector("#cardImageInput");
const cardPreviewModal = document.querySelector("#cardPreviewModal");
const cardPreviewCloseButton = document.querySelector(
  "#modalCardPreviewCloseButton"
);
const cardImage = cardPreviewModal.querySelector("#modalPreviewImage");
const cardCaption = cardPreviewModal.querySelector("#modalCaption");

// Function to close a modal window
function closeModalWindow(modal) {
  modal.classList.remove("modal_opened");
}

// Function to open a modal window
function openModalWindow(modal) {
  modal.classList.add("modal_opened");
}

// Event handler for profile form submission
function handleProfileFormSubmit(e) {
  e.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closeModalWindow(profileEditModal);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

// Event handler for the like button
function handleLikeButton(e) {
  e.target.classList.toggle("card__like-button_active");
}

// Event handler for deleting a card
function handleDeleteCard(e) {
  e.target.closest(".card").remove();
}

// Event handler for previewing an image in a modal
function handlePreviewImage(cardData) {
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardCaption.textContent = cardData.name;

  openModalWindow(cardPreviewModal);
}

// Event handler for closing the preview modal
function handlePreviewModalClose() {
  closeModalWindow(cardPreviewModal);
}

const handleEscKey = (e) => {
  const openedModal = document.querySelector(".modal_opened");
  if (e.key === "Escape") {
    if (openedModal) {
      closeModalWindow(openedModal);
    }
  }
};

cardPreviewCloseButton.addEventListener("click", handlePreviewModalClose);

// Function to create a card element from card data
function getCardElement(cardData) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector("#cardImage");
  const cardTitle = cardElement.querySelector("#cardTitle");
  const likeButton = cardElement.querySelector("#cardLikeButton");
  const deleteButton = cardElement.querySelector("#cardDeleteButton");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  likeButton.addEventListener("click", handleLikeButton);
  deleteButton.addEventListener("click", handleDeleteCard);
  cardImage.addEventListener("click", () =>
    handlePreviewImage(cardData, cardImage, cardPreviewModal)
  );

  return cardElement;
}

// Function to fill the profile form
function fillProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

// Event handler for card form submission
function handleCardFormSubmit(e) {
  e.preventDefault();

  const cardData = {
    name: cardTitleInput.value,
    link: cardImageInput.value,
  };

  const cardElement = getCardElement(cardData);
  cardsWrap.prepend(cardElement);

  e.target.reset();
  closeModalWindow(cardAddModal);
  toggleButtonState(
    [cardTitleInput, cardImageInput],
    cardFormSubmitButton,
    config
  );
}

// Event listeners
profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  openModalWindow(profileEditModal);
});

profileCloseButton.addEventListener("click", () =>
  closeModalWindow(profileEditModal)
);

profileAddButton.addEventListener("click", () => openModalWindow(cardAddModal));

cardCloseButton.addEventListener("click", () => closeModalWindow(cardAddModal));

cardAddForm.addEventListener("submit", handleCardFormSubmit);

// Modal Window Functions with Keydown Event.
function closeModalEscape(event) {
  if (event.key === "Escape" || event.code === "Escape") {
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

//Close a Modal Window by Clicking on Specific Elements
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

addModalEventListener(profileEditModal, ["modal__close"]);
addModalEventListener(cardAddModal, ["modal__close"]);
addModalEventListener(cardPreviewModal, [
  "modal__wrapper",
  "modal__close-preview",
]);

const renderCard = (data, wrap) => {
  wrap.prepend(getCardElement(data));
};

// Initial rendering of cards
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsWrap.prepend(cardElement);
});
