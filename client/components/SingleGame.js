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
      <div className="single-game-container">
        <img src={game.imageUrl}/>
        <div className="single-game-info">
          <p className="sg-title">{game.name}</p>
          <p className="sg-price">{`$${game.price}`}</p>
          <button className="sg-add-button" value={game.id} onClick={() => addToCart(game)}>
            Add To Cart
            <i className="fas fa-cart-plus"></i>
          </button>
          <div className="sg-desc">
            <p className="sg-overview">Overview:</p>
            <p className="sg-game-desc">{game.description}</p>
            <br />
            <p className="sg-d">Platforms: {game.platform}</p>
            <p className="sg-d">Genre: {game.genre}</p>
            <p className="sg-d">Publisher: {game.publisher}</p>
            <p className="sg-d">Release Date: {game.releaseDate}</p>
            <p className="sg-d">ESRB Rating: {game.maturityRating}</p>
          </div>
        </div>
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
