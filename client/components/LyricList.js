import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { queries } from 'apollo-client/queries/store';
import { DocumentQuery } from 'mongoose';
import { optimistic } from 'apollo-client/optimistic-data/store';

class LyricList extends Component {
  onLike(id, likes) {
    // console.log("dasdsa", id);
    // we pass in variabless obj 
    // inside we pass all variables that mutation
    // expects to have
    this.props.mutate({
      variables: {id: id},
      optimisticResponse: {
        __typename: 'Mutation',
        // provide what we expect to get
        likeLyric: {
          id: id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    })
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <div className="vote-box">
            ({likes})
            <i
              className="material-icons blue-text"
              onClick={() => this.onLike(id, likes)}>thumb_up</i>
          </div>
        </li>
      );
    });
  }
  render() {
    return (
      <div>
        <ul className="collection">
          {this.renderLyrics()}
        </ul>
      </div>
    );
  }
}

const mutation = gql`
  mutation likeLyric($id: ID) {
    likeLyric(id: $id) {
      id 
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);