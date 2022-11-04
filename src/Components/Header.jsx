import React, { Component } from 'react';
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
      <>
        <header data-testid="header-component">
          <p>test</p>
        </header>
        {
          isLoading ? '' : (
            <Loading />
          )
        }

        <h2 data-testid="header-user-name">{ SavedName }</h2>
      </>
    );
  }
}

export default Header;
