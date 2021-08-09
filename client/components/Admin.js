import React from 'react';
import { Link } from 'react-router-dom';

export default class Admin extends React.Component {
  render() {
    console.log('inside of admin')
    return(
      <div>
        <h1>Administration</h1>
        <Link to="admin/editGames">
          <button type="button">Edit Games</button>
        </Link>
        <Link to="admin/createGame">
          <button type="button">Create New Game</button>
        </Link>
        <Link to="admin/users">
          <button type="button">View Users</button>
        </Link>
      </div>
    )
  }
}
