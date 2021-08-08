import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllGames } from '../store/games';

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
              <Link to={`games/${game.id}`}>{game.name}</Link>
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
const mapDispatchToProps = dispatch => {
  return {
    loadAllGames: () => {
      dispatch(fetchAllGames());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminGames);
