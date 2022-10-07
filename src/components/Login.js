import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    message: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = state;

    if (!email || !password) return;

    onLogin(email, password)
      .catch(err => {
        console.log(err);
        setState({
          ...state,
          message: 'Что-то пошло не так!'
        })
      });
  };

  return(
    <div onSubmit={handleSubmit} className="login">

      <p className="login__welcome">
        Это приложение содержит конфиденциальную информацию.
        Пожалуйста, войдите или зарегистрируйтесь, чтобы получить доступ к CryptoDucks.
      </p>
      <p className="login__error">
        {state.message}
      </p>
      <form className="login__form">
        <label for="email">
          Email:
        </label>
        <input id="email" required name="email" type="email" value={state.email} onChange={handleChange} />
        <label for="password">
          Пароль:
        </label>
        <input id="password" required name="password" type="password" value={state.password} onChange={handleChange} />
        <div className="login__button-container">
          <button type="submit" className="login__link">Войти</button>
        </div>
      </form>

      <div className="login__signup">
        <p>Ещё не зарегистрированы?</p>
        <Link to="/signup" className="signup__link">Регистрация</Link>
      </div>
    </div>
  );
}

export default Login;
