import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchAllGames } from "../store/games"

class AllGames extends React.Component {
  componentDidMount() {
    this.props.loadAllGames()
  }

  render() {
    console.log('At AllGames, this.props:', this.props);
    return (
      <div id="games-container">
        {this.props.allGames.map((game) => (
          <div key={game.id}>
            <Link to={`games/${game.id}`}>
              <p>{game.title}</p>
              <img src={game.imageUrl} />
            </Link>
            <small>{`$${game.price}`}</small>
          </div>
        ))}
      </div>
    )
  }
}

//mapStateToProps
const mapStateToProps = state => {
  return {
    allGames: state.games.games
  }
}
//mapDispatchToProps
const mapDispatchToProps = dispatch => {
  return {
    loadAllGames: () => { 
      dispatch(fetchAllGames());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllGames)
