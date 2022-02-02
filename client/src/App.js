import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Game from './pages/Game/Game';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Signup from './pages/Signup/Signup';

const httpLink = createHttpLink({
  uri: '/graphql',
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
        <div className="app__body">
          <div className="app__container">
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/game/:gameId" element={<Game />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile/:username" element={<Profile />} />
            </Routes>
            <Footer />
          </Router>
          </div>
        </div>
    </ApolloProvider>
  );
}



export default App;

