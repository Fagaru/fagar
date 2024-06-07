import React from 'react';

const Header = () => (
  <header className="header">
    <div className="logo">Fagar</div>
    <div className="menu">
      <button>Ajouter une entreprise</button>
      <button className="profile-button">Profile</button>
    </div>
  </header>
);

export default Header;