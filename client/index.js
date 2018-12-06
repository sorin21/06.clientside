import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import './style/style.css';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import App from './components/App';
import SongList from './components/SongList';
import SongCreate from "./components/SongCreate";
import SongDetail from "./components/SongDetail";

// Is making request for data and storing data locally when the response came back
// Assumes that the GraphQL Sever is available on /graphql route
const client = new ApolloClient({
  // every time when we make a query
  // we ask for id for every record
  // so we have to put id for every query
  // used to refresh lyric list
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    // Makes the GraphQL client available to any of your components
    // It provides an ApolloClient instance to all of your GraphQL components
    // client = we passing a referince to Apollo Store
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
