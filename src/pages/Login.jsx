import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    name: '',
    isLoading: false,
    redirect: false,
  };

  handleUserApi = async () => {
    this.setState({
      isLoading: true,
    });

    const { name } = this.state;
    await createUser({ name });

    this.setState({
      redirect: true,
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
    const { name } = this.state;
    const minCaracter = 3;
    const results = name.length >= minCaracter;
    return results;
  };

  render() {
    const { name, isLoading, redirect } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            name="name"
            value={ name }
            data-testid="login-name-input"
            placeholder="Digite seu Nome:"
            onChange={ this.onInputChange }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ !this.validateForm() }
            onClick={ this.handleUserApi }
          >
            Entrar
          </button>
        </form>
        {
          !isLoading ? '' : (
            <Loading />
          )
        }

        {
          redirect ? <Redirect to="/search" /> : (
            <>
            </>
          )

        }
      </div>
    );
  }
}

export default Login;
