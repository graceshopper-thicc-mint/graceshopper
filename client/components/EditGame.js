import React from 'react';
import { connect } from 'react-redux';
import { fetchAllGames, fetchSingleGame, setSingleGame, updateGame } from '../store/games';

class EditGame extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      price: 0,
      maturityRating: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    const gameId = this.props.match.params.gameId
    this.props.getSingleGame(gameId)
  }

  componentWillUnmount(){
    this.props.clearGame();
  }

  componentDidUpdate(prevProps){
    console.log(prevProps);
    if(prevProps.game.name !== this.props.game.name){
      this.setState({
        name: this.props.game.name,
        price: this.props.game.price,
        maturityRating: this.props.game.maturityRating
      })
    }
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.updateGame(this.props.match.params.gameId, {...this.state});
  }

  render() {
    return(
      <form id="edit-game" onSubmit={this.handleSubmit}>
        <div>
        <label htmlFor="name">Game Name: </label>
        <input name="name" value={this.state.name} onChange={this.handleChange}></input>

        <label htmlFor="price">Price (in cents): </label>
        <input name="price" value={this.state.price} onChange={this.handleChange}></input>

        <label htmlFor="maturityRating">Maturity Rating: </label>
        <input name="maturityRating" value={this.state.maturityRating} onChange={this.handleChange}></input>
        </div>

        <button type="submit">Edit</button>
      </form>
    )
  }

}

const mapStateToProps = state => {
  return{
    game: state.games.singleGame,
    allGames: state.games.allGames
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return{
    getSingleGame: (id) => dispatch(fetchSingleGame(id)),
    getAllGames: () => dispatch(fetchAllGames()),
    clearGame: () => {dispatch(setSingleGame({}))},
    updateGame: (id, game) => dispatch(updateGame(id, game, history)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGame);
