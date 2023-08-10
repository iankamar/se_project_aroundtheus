//UserInfo.js
export default class UserInfo {

  // Constructor to initialize selectors for user name and description
  constructor({ userNameSelector, userDescriptionSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
  }

  // Method to retrieve user information from DOM
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userDescription: this._userDescription.textContent,
    };
  }

  // Method to set user information in the DOM
  setUserInfo({ name, description }) {
    this._userName.textContent = name;
    this._userDescription.textContent = description;
  }

  // Function to fill the profile form
  fillProfileForm(profileNameInput, profileDescriptionInput) {
  const { userName, userDescription } = this.getUserInfo();
  profileNameInput.value = userName;
  profileDescriptionInput.value = userDescription;
  }
}