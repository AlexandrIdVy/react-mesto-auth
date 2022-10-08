import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {

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
    const { password, email } = state;

    if (!password || !email) return;

    onLogin(password, email)
      .catch(err => {
        console.log(err);
        setState({
          ...state,
          message: 'Что-то пошло не так!'
        })
      });
  }

  return(
    <div onSubmit={handleSubmit} className="login">
      <p className="login__error">
        {state.message}
      </p>
      <form className="login__form">
        <label htmlFor="email">
          Email:
        </label>
        <input id="email" required name="email" type="email" value={state.email} onChange={handleChange} />
        <label htmlFor="password">
          Пароль:
        </label>
        <input id="password" required name="password" type="password" value={state.password} onChange={handleChange} />
        <div className="login__button-container">
          <button type="submit" className="login__link">Войти</button>
        </div>
      </form>

      <div className="login__signup">
        <Link to="/signup">Регистрация</Link>
      </div>
    </div>
  );
}

export default Login;
