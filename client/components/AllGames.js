import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

class AllGames extends React.Component {
  componentDidMount() {
    //this.props.loadAllGames
  }

  render() {
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
mapStateToProps = state => {
  return {
    allGames:
  }
}
//mapDispatchToProps
mapDispatchToProps = dispatch => {
  return {
    loadAllGames: () =>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllGames)
