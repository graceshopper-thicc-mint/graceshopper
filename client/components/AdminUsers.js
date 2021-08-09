import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../store/users';

class AdminUsers extends React.Component {
  componentDidMount(){
    this.props.fetchUsers();
  }

  render(){
    return(
      <table id="users-table">
        <thead>
        <tr>
          <th>ID</th>
          <th>UserName</th>
          <th>Email Address</th>
        </tr>
        </thead>
        <tbody>
        {this.props.users.map((user) => {
          return(
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          )
        })}
        </tbody>
      </table>
    )
  }
}

const mapState = state => {
  return {
    users: state.users
  }
}

const mapDispatch = dispatch => {
  return {
    fetchUsers: () => {dispatch(fetchUsers())},
  }
}

export default connect(mapState, mapDispatch)(AdminUsers);
