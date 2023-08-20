// Token = "68a8781d-0ef6-4f31-8a00-f95473676b23"

export default class Api {
   constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
   }

   _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
   }

   getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
    .then(this._checkResponse);
   }

   getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
    .then(this._checkResponse);
   }

   setProfileImage(baseUrl) {
    return fetch(`${this._baseUrl}/users/me/profileImage`,{
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        profileImage: baseUrl,
      }),
    })
    .then(this._checkResponse);
   }

   getWebpageInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
   }

   editUserInfo(data) {
    return fetch(`${this._baseurl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
    .then(this._checkResponse);
   }

   editProfile({data}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.link,
      }),
    })
    .then(this._checkResponse);
   }

   addCard ({data}) {
    return fetch (`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
    .then(this._checkResponse);
   };

   deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._checkResponse);
   }

   addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
    .then(this._checkResponse);
   }

   removeLike(cardId) {
    return fetch (`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._checkResponse);
   }

}