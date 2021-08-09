import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchAllGames } from "../store/games"
import { addToCart, fetchCart } from '../store/cart';

class AllGames extends React.Component {
  componentDidMount() {
    this.props.loadAllGames()
  }

  handleAddToCart(e) {
    const game = e.target.value
    addToCart(game)
  }
  render() {
    const { addToCart, allGames } = this.props;

    return (
      <div id="games-container">
        {allGames.map((game) => (
          <div key={game.id}>
          <div className="game-background-white">
            <div className="game-background">
              <div className="game">
                <Link to={`games/${game.id}`}>
                  <img src={game.imageUrl} />
                </Link>
                <div className="section">
                  <Link to={`games/${game.id}`}>
                    <p className="game-name">{game.name}</p>
                  </Link>
                  <p>Publisher: {game.publisher}</p>
                  <p>Release Date: {game.releaseDate}</p>
                  <p>ESRB Rating: {game.maturityRating}</p>
                  <div className="stars">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                  </div>
                </div>
                <div className="add-to-cart-section">
                  <p>{`$${game.price}`}</p>
                  <button value={game} className="add-to-cart-button" onClick={() => addToCart(game)}>
                    Add To Cart
                    <i className="fas fa-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr />
          </div>
        ))}
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
    addToCart: (game) => dispatch(addToCart(game)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllGames)
