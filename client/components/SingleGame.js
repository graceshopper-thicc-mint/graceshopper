import React from "react"
import { connect } from "react-redux"
import { fetchSingleGame } from "../store/games"
import { Link } from "react-router-dom"

class SingleGame extends React.Component {
  async componentDidMount() {
    const gameId = this.props.match.params.gameId
    await this.props.getSingleGame(gameId)
  }

  render() {
    const { game } = this.props
    return (
      <div id="single-game">
        <h1>{game.name}</h1>
        <p>Publisher: {game.publisher}</p>
        <p>Release Date: {game.releaseDate}</p>
        <p>ESRB Rating: {game.maturityRating}</p>
        <img src={game.imageUrl}/>
        <p>{`$${game.price}`}</p>
        <button value={game.id}>
          Add To Cart
          <i class ="fas fa-cart-plus"></i>
        </button>
        <p>Overview:</p>
        <p>{game.description}</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    game: state.games.singleGame
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleGame: (id) => dispatch(fetchSingleGame(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleGame)
