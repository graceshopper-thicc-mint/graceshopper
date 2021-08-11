import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import {me} from './store'
import AllGames from './components/AllGames';
import Cart from './components/Cart';
import SingleGame from "./components/SingleGame"
import OrderConfirmation from "./components/OrderConfirmation"
import Admin from "./components/Admin";
import AdminGames from "./components/AdminGames";
import EditGame from "./components/EditGame";
import CreateGame from './components/CreateGame';
import AdminUsers from './components/AdminUsers';
import GuestOrderConfirmation from "./components/GuestOrderConfirmation";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            {isAdmin ? (
              <Switch>
                <Route exact path="/admin" component={Admin}/>
                <Route path="/admin/users" component={AdminUsers}/>
                <Route exact path="/admin/editGames" component={AdminGames}/>
                <Route exact path="/admin/editGames/:gameId" component={EditGame}/>
                <Route path="/admin/createGame" component={CreateGame}/>
                <Route path="/cart" component={Cart}/>
                <Route exact path="/games" component={AllGames} />
                <Route path="/games/:gameId" component={SingleGame} />
                <Route path="/users/:userId/confirmation" component={OrderConfirmation} />
              </Switch>) : null
            }
            <Route path="/cart" component={Cart}/>
            <Route exact path="/games" component={AllGames} />
            <Route path="/games/:gameId" component={SingleGame} />
            <Route
              path="/users/:userId/confirmation"
              component={OrderConfirmation}
            />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route exact path="/games" component={AllGames} />
            <Route path="/games/:gameId" component={SingleGame} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/cart" component={Cart} />
            <Route path="/confirmation" component={GuestOrderConfirmation} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
