//UserInfo.js
// UserInfo class for managing user information
export default class UserInfo {

  // Constructor to initialize selectors for user name and description
  constructor({ userNameSelector, userDescriptionSelector }) {
    // Store references to user name and description elements
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
    // Update user name and description elements with provided data
    this._userName.textContent = name;
    this._userDescription.textContent = description;
  }
}