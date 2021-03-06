import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from "react-router";
import query from "../queries/fetchSongs";


class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {title: ''}
    // this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.mutate({
      variables: { title: this.state.title },
      // take an array of queries
      // refetchQueries updates the UI, refreshes the page
      // for this query
      refetchQueries: [{query: query}]
    })
    .then(() => hashHistory.push('/'))
    // .catch(() =>)
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input onChange={event => this.setState({title: event.target.value})} value={this.state.value} />
        </form>  
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String){
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);