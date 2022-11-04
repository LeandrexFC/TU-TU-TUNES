import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  state = {
    isLoading: false,
    SavedName: '',
  };

  async componentDidMount() {
    this.handleGetUserApi();

    this.setState({
      isLoading: false,
    });
  }

  handleGetUserApi = async () => {
    const results = await getUser();

    this.setState({
      isLoading: true,
      SavedName: results.name,
    });
  };

  render() {
    const { isLoading, SavedName } = this.state;
    return (
      <div>
        <header data-testid="header-component">
          <p data-testid="header-user-name">{ SavedName }</p>
        </header>
        {
          isLoading ? '' : (
            <Loading />
          )
        }
        <nav>
          <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </nav>
      </div>
    );
  }
}

export default Header;
