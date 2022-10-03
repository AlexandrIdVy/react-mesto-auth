import config from './utils'

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  // обработчик промисов
  _handlePromise(res) {
    if (res.ok) {
      return res.json();
    }
    // отклоняем промис в случае ошибки
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  // получаем данные пользователя
  getUserMe() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(res => this._handlePromise(res));
  }
  // отправляем данные пользователя на сервер
  sendDataUserMe(dataUser) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: dataUser.name,
        about: dataUser.about
      })
    })
      .then(res => this._handlePromise(res));
  }
  // получаем карточки
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(res => this._handlePromise(res));
  }
  // добавляем карточку на сервер
  sendCard(card) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then(res => this._handlePromise(res));
  }
  // удаляем карточку с сервера
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._handlePromise(res));
  }
  // добавляем лайк
  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => this._handlePromise(res));
  }
  // удаляем лайк
  removeLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._handlePromise(res));
  }
  // меняем аватар
  editAvatar(dataUser) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: dataUser.avatar,
      })
    })
      .then(res => this._handlePromise(res));
  }
}

//создаем экземпляр класса для Api
const api = new Api(config);

export default api;
