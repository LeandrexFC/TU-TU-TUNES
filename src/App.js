import React from 'react';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <>
        <p>TrybeTunes</p>
        <Album />
        <Favorites />
        <Login />
        <NotFound />
        <Profile />
        <ProfileEdit />
        <Search />
      </>
    );
  }
}

export default App;
