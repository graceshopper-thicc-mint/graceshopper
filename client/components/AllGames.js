import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchAllGames } from "../store/games"
import { addToCart, fetchCart } from '../store/cart';
import ReactPaginate from "react-paginate";

class AllGames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      perPage: 5,
      currentPage: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    // Use setTimeout to loadAllGames to state before rendering state
    setTimeout(() => { return this.renderGames(); }, 120);
    this.props.loadAllGames();
  }

  renderGames() {
    const { allGames, addToCart } = this.props;
    let gamesData = allGames;
    const gamesSlice = gamesData.slice(this.state.offset, this.state.offset + this.state.perPage)
    const renderGames = gamesSlice.map((game) => (
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
              <p>Publisher: <span>{game.publisher}</span></p>
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
              <button className="add-to-cart-button" onClick={() => addToCart(game)}>
                Add To Cart
                <i className="fas fa-cart-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      </div>
    ))

    this.setState({
      pageCount: Math.ceil(gamesData.length / this.state.perPage),
      renderGames
    })
  }

  handlePageClick (e) {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset,
    }, () => {
        this.renderGames();
    });
  }

  render() {
    return (
      <div id="games-container">
        {this.state.renderGames}
        <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}/>
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
