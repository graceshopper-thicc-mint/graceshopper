import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteGame, fetchAllGames } from '../store/games';

class AdminGames extends React.Component {
  async componentDidMount(){
    await this.props.loadAllGames();
  }
  render(){
    return(
      <div>
          {this.props.allGames.map((game) => {
            return(
            <div key={game.id}>
              <Link to={`editGames/${game.id}`}>{game.name}</Link>
              <button type="button" onClick={() => this.props.deleteGame(game.id)}>Delete</button>
            </div>
            )
          })}
      </div>
    )
  }
}

//mapStateToProps
const mapStateToProps = state => {
  return {
    allGames: state.games.allGames,
  }
}
//mapDispatchToProps
const mapDispatchToProps = (dispatch, { history }) => {
  return {
    loadAllGames: () => {
      dispatch(fetchAllGames());
    },
    deleteGame: (gameId) => {
      dispatch(deleteGame(gameId, history))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminGames);
