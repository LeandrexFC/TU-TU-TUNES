import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { createUser } from '../services/userAPI';
import logo from '../images/logo.png';
import '../css/Login.css';

class Login extends Component {
  state = {
    name: '',
    isLoading: false,
  };

  handleUserApi = async (e) => {
    e.preventDefault();
    const { history } = this.props;
    this.setState({
      isLoading: true,
    });

    const { name } = this.state;
    await createUser({ name });

    history.push('/search');

    this.setState({
      isLoading: false,
    });
  };

  onInputChange = (event) => {
    const { name, type } = event.target;
    const value = type === 'checkbox' ? checkbox : event.target.value;
    this.setState({
      [name]: value,
    });
  };

  validateForm = () => {
    const { isLoading } = this.state;
    const { name } = this.state;
    const minCaracter = 3;
    const results = name.length >= minCaracter;

    return results && !isLoading;
  };

  render() {
    const { name, isLoading } = this.state;
    return (
      <div className="allLogin">
        <Helmet>
          <title>TU-TU-TUNES</title>
          <link rel="icon" href="./images/logo.png" />
        </Helmet>
        {/* <img alt="background img" className="backgroundImg" /> */}
        <div data-testid="page-loginn" className="allPageLogin">
          <form className="page-login">
            <img src={ logo } alt="project img" className="loginImg" />
            <input
              type="text"
              name="name"
              value={ name }
              data-testid="login-name-input"
              placeholder="Digite seu Nome:"
              onChange={ this.onInputChange }
              className="inputText"
            />

            <button
              className="btn btn-primary loginButton"
              type="submit"
              data-testid="login-submit-button"
              disabled={ !this.validateForm() }
              onClick={ this.handleUserApi }
            >
              Entrar
              { '  ' }
              {
                !isLoading ? '' : (
                  <span
                    className="spinner-border spinner-border-sm "
                    role="status"
                    aria-hidden="true"
                  />
                )
              }
              { ' ' }
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
