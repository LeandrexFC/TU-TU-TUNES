import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import '../css/ProfileEdit.css';
import { updateUser, getUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    isLoading: false,
    name: '',
    email: '',
    image: '',
    description: '',
  };

  async componentDidMount() {
    const { isLoading } = this.state;
    console.log(isLoading);
    this.setState({
      isLoading: true,
    });

    const results = await getUser();

    this.setState({
      isLoading: false,
      name: results.name,
      email: results.email,
      image: results.image,
      description: results.description,
    });
  }

  onInputChange = (event) => {
    const { name, type } = event.target;
    const value = type === 'checkbox' ? checkbox : event.target.value;
    this.setState({
      [name]: value,
    });
  };

  verifyButton = () => {
    const { name, email, description } = this.state;

    const correctForm = email.includes('@' && '.com');
    const number = 3;
    const minCaratcter = name.length && description.length >= number;

    return correctForm && minCaratcter;
  };

  OnClickUpdateUser = async () => {
    const { name, email, image, description } = this.state;

    const { history } = this.props;
    const userObj = {
      name,
      email,
      image,
      description,
    };

    this.setState({
      isLoading: true,
    });

    await updateUser(userObj);

    this.setState({
      isLoading: false,
    });

    history.push('/profile');
  };

  render() {
    const { name, description, image, email } = this.state;
    return (
      <>
        <div className="allProfileEdit">
          <Header />
        </div>
        <div className="color">
          <form data-testid="page-profile-edit" className="page-profile-edit">
            <label htmlFor="name">
              Nome:
              <input
                type="text"
                data-testid="edit-input-name"
                id="name"
                name="name"
                value={ name }
                onChange={ this.onInputChange }
                className="input"
              />
            </label>

            <label htmlFor="email">
              Email:
              <input
                className="input"
                type="email"
                data-testid="edit-input-name"
                id="email"
                name="email"
                value={ email }
                onChange={ this.onInputChange }
              />
            </label>

            <label htmlFor="description">
              Descrição:
              <textarea
                className="input"
                cols="25"
                rows="3"
                data-testid="edit-input-name"
                id="description"
                name="description"
                value={ description }
                onChange={ this.onInputChange }
              />
            </label>

            <label htmlFor="img">
              Imagem de Perfil:
              <input
                className="input"
                type="text"
                data-testid="edit-input-image"
                id="img"
                alt="img"
                name="image"
                value={ image }
                onChange={ this.onInputChange }
                placeholder="insira um Link vãlido"
              />
            </label>
            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ !this.verifyButton() }
              onClick={ this.OnClickUpdateUser }
              className="btnEdit"
            >
              Salvar
            </button>
          </form>
        </div>
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
