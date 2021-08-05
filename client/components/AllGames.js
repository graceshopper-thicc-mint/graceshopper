import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchAllGames } from "../store/games"
import { addToCart } from '../store/cart';

class AllGames extends React.Component {
  componentDidMount() {
    this.props.loadAllGames()
  }


  render() {
    const { addToCart } = this.props;

    return (
      <div id="games-container">
        {this.props.allGames.map((game) => (
          <div key={game.id} className="game">
            <Link to={`games/${game.id}`}>       
              <img src={game.imageUrl} />
              <div className="section">
                <p>{game.name}</p>
                <p>{`$${game.price}`}</p>
              </div>
            </Link>
            <button value={game.id} onClick={() => addToCart()}>
              Add To Cart
              <i className="fas fa-cart-plus"></i>
            </button>
          </div>
        ))}
      </div>
    )
  }
}

//mapStateToProps
const mapStateToProps = state => {
  console.log('state: ', state);
  return {
    allGames: state.games.allGames
  }
}
//mapDispatchToProps
const mapDispatchToProps = dispatch => {
  return {
    loadAllGames: () => {
      dispatch(fetchAllGames());
    },
    addToCart: () => dispatch(addToCart()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllGames)
