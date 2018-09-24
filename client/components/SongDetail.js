import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';

 class SongDetail extends Component {
  render() {
    const {song} = this.props.data;

    // if is still loading
    if(!song) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back</Link>
        <p>{song.title}</p>
        <LyricCreate songId={this.props.params.id} />
      </div>
    )
  }
}

export default graphql(fetchSong, {
  options: (props) => {
    return {
      variables: { id: props.params.id}
    }
  }
})(SongDetail);