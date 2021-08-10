import React from "react"
import { connect } from "react-redux"
import { fetchSingleGame } from "../store/games"
import { Link } from "react-router-dom"
import { addToCart } from "../store/cart"

class SingleGame extends React.Component {
  async componentDidMount() {
    const gameId = this.props.match.params.gameId
    await this.props.getSingleGame(gameId)
  }

  render() {
    const { game, addToCart } = this.props
    return (
      <div id="single-game">
        <h1>{game.name}</h1>
        <p>Platforms: {game.platform}</p>
        <p>Genre: {game.genre}</p>
        <p>Publisher: {game.publisher}</p>
        <p>Release Date: {game.releaseDate}</p>
        <p>ESRB Rating: {game.maturityRating}</p>
        <img src={game.imageUrl}/>
        <p>{`$${game.price/100}`}</p>
        <button value={game.id} onClick={() => addToCart(game)}>
          Add To Cart
          <i className="fas fa-cart-plus"></i>
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
    getSingleGame: (id) => dispatch(fetchSingleGame(id)),
    addToCart: (game) => dispatch(addToCart(game)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleGame)
