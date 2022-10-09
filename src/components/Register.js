import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {

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

    onRegister(password, email, message);
  }

  return(
    <div className="register">

      <p className="register__error">
        {state.message}
      </p>
      <form onSubmit={handleSubmit} className="register__form">
        <label htmlFor="email">
          Email:
        </label>
        <input id="email" name="email" type="email" value={state.email} onChange={handleChange} />
        <label htmlFor="password">
          Пароль:
        </label>
        <input id="password" name="password" type="password" value={state.password} onChange={handleChange} />
        <div className="register__button-container">
          <button type="submit" className="register__link">Зарегистрироваться</button>
        </div>
      </form>
      <div className="register__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in">Войти</Link>
      </div>
    </div>
  );
}

export default Register;
