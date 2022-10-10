import React, { useState } from 'react';

function Login({ onLogin, name, buttonText }) {

  const [state, setState] = useState({
    email: '',
    password: '',
    message: ''
  });

  function handleChange(e) {
    const {name, value} = e.target;
    setState({
      ...state,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { password, email, message } = state;

    if (!password || !email) return;

    onLogin(password, email, message);
  }

  return(
    <main className="auth">
      <h2 className="auth__title">Вход</h2>
      <form name={name} className={`popup__form popup__form_type_${name}`} onSubmit={handleSubmit}>
        <label className="popup__fieldset">
          <input type="email"
          className="popup__form-input popup__form-input_type_email"
          id="email"
          placeholder="Email"
          name="email"
          required
          value={state.email}
          onChange={handleChange}
          />
          <span className="popup__form-input-error email-error"></span>
        </label>
        <label className="popup__fieldset">
          <input type="password"
          className="popup__form-input popup__form-input_type_password"
          id="password"
          name="password"
          placeholder="Пароль"
          required
          value={state.password}
          onChange={handleChange}
          />
          <span className="popup__form-input-error password-error"></span>
        </label>
        <button type="submit" className="popup__form-confirm-btn button button_type_auth">{buttonText}</button>
      </form>
    </main>
  );
}

export default Login;
