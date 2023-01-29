import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import profileImg from '../images/profile.png';
import '../css/Profile.css';

class Profile extends Component {
  state = {
    isLoading: false,
    userInformations: [],
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });

    const results = await getUser();

    this.setState({
      isLoading: false,
      userInformations: results,
    });
  }

  render() {
    const { isLoading, userInformations } = this.state;
    return (
      <>
        <div className="all-page-profile">
          <Header profile={ userInformations.image } />
        </div>
        <div>
          {
            isLoading ? <Loading /> : (
              <div data-testid="page-profile" className="page-profile">
                <img
                  src={ !userInformations.image ? profileImg : userInformations.image }
                  alt="profile img"
                  data-testid="profile-image"
                  className="profile-image"
                />
                <h3>Nome: </h3>
                <p>
                  {' '}
                  { userInformations.name }
                  {' '}
                </p>
                <h3>Email: </h3>
                <p>
                  {' '}
                  { userInformations.email }
                  {' '}
                </p>
                <h3>Descrição: </h3>
                <p>
                  {' '}
                  { userInformations.description }
                  {' '}
                </p>
                <Link to="/profile/edit">Editar Perfil</Link>
              </div>

            )
          }
        </div>
      </>
    );
  }
}

export default Profile;
