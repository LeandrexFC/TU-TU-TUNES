import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import logo from '../images/logo.png';
import pesquisaImg from '../images/lupa.png';
import starImg from '../images/star.png';
import profileImg from '../images/profile.png';
import '../css/Header.css';

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
    const { profile } = this.props;
    return (
      <div className="allHeader">
        <img src={ logo } alt="logo" className="headerImg" />
        <aside data-testid="header-component" className="header-component">
          {
            isLoading ? '' : (
              <Loading />
            )
          }
          <Link
            data-testid="link-to-search"
            to="/search"
            className="headerNav"
          >
            <img src={ pesquisaImg } alt="search img" className="AllHeaderImg" />
            Pesquisa

          </Link>
          <Link
            data-testid="link-to-favorites"
            to="/favorites"
            className="headerNav"
          >
            <img src={ starImg } alt="favorites Img" className="AllHeaderImg" />
            Favoritas

          </Link>
          <Link
            data-testid="link-to-profile"
            to="/profile"
            className="headerNav"
          >
            <img
              src={ profileImg }
              alt="profile img"
              className="AllHeaderImg "
            />
            Perfil

          </Link>
          <p data-testid="header-user-name" className="headerNav">
            <img
              src={ !profile ? profileImg : profile }
              alt="profile img"
              className="AllHeaderImg userImg"
            />
            { SavedName }

          </p>
        </aside>
      </div>
    );
  }
}

Header.propTypes = {
  profile: Proptypes.string.isRequired,
};

export default Header;
