// Token = "68a8781d-0ef6-4f31-8a00-f95473676b23"

export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return this._request(url, options).then(this._handleResponse);
  }

  getUserInfo() {
    return this._request(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    });
  }

setProfileImage(url) {
  return this._request(`${this.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: this.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  });
}

getProfileInfo(data) {
  return this._request(`${this.baseUrl}/users/me`, {
    method: "PATCH",
    headers: this.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.description,
    }),
  });
}

getInitialCards() {
  return this._request(`${this.baseUrl}/cards`, {
    method: "GET",
    headers: this.headers,
  });
}

getWebpageInfo() {
  return Promise.all([this.getInitialCards(), this.getUserInfo()]);
}

addCard(data) {
  return this._request(`${this.baseUrl}/cards/${cardId}`, {
    method: "POST",
    headers: this.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link,
    }),
  });
}

deleteCard(cardId) {
  return this._request(`${this.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: this.headers,
  });
}

addLike(cardId) {
  return this._request(`${this.baseUrl}/cards/${cardId}/likes`, {
    method: "PUT",
    headers: this.headers,
  });
}

removeLike(cardId) {
  return this._request(`${this.baseUrl}/cards/${cardId}/likes`, {
    method: "DELETE",
    headers: this.headers,
  });
}


/*
getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then(this._handleResponse);

  setProfileImage(url) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: url,
      }),
    }).then(this._handleResponse);
  }

  getProfileInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.description,
      }),
    }).then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then(this._handleResponse);
  }

  getWebpageInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  addCard(data) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._handleResponse);
  }

  addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    }).then(this._handleResponse);
  }

  removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._handleResponse);
  }
  */
}