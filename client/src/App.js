import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Header from './components/Header/Header';
// import Footer from './components/Footer';

<<<<<<< HEAD
// import Game from './pages/Game';
import Login from './pages/Login';
// import Profile from './pages/Profile';
import Signup from './pages/Signup';
=======
import Game from './pages/Game/Game';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Signup from './pages/Signup/Signup';
>>>>>>> 53ed4cf3117a318d7fcfef221f8382f13f83a4e2

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="">
          <Header />
          <div className="">
            <Switch>
              <Route exact path="/game/:gameId" component={Game} />
              <Route exact path="/" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:username?" component={Profile} />
            </Switch>
          </div>
          {/* <Footer /> */}
        </div>
      </Router>
    </ApolloProvider>
  );
}



export default App;

