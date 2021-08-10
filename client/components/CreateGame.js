import React from 'react';
import { connect } from 'react-redux';
import { createGame } from '../store/games';

class CreateGame extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      price: 0,
      genre: '',
      maturityRating: '',
      publisher: '',
      description: '',
      releaseDate: new Date().toISOString().slice(0, 10),
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createGame({...this.state});
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render(){
    return(
      <div>
        <form id="create-game" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Game Name</label>
            <input name="name" onChange={this.handleChange} value={this.name} />

            <label htmlFor="price">Price (in cents)</label>
            <input name="price" type="number" onChange={this.handleChange} value={this.price} />

            <label htmlFor="genre">Genre</label>
            <input name="genre" onChange={this.handleChange} value={this.genre} />

            <label htmlFor="maturityRating">Maturity Rating</label>
            <input name="maturityRating" onChange={this.handleChange} value={this.maturityRating} />

            <label htmlFor="publisher">Publisher</label>
            <input name="publisher" onChange={this.handleChange} value={this.publisher} />

            <label htmlFor="description">Description</label>
            <input name="description" onChange={this.handleChange} value={this.description} />

            <label htmlFor="releaseDate">Release Date</label>
            <input name="releaseDate" type="date" onChange={this.handleChange} value={this.releaseDate} />
          </div>
          <button type="submit">Create Game</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    createGame: (game) => {dispatch(createGame(game, history))},
  }
}

export default connect(null, mapDispatch)(CreateGame);
