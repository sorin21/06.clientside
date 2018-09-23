import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';


class SongList extends Component {
  constructor(props) {
    super(props);
    // this.onSongDelete = this.onSongDelete.bind(this);
  }

  onSongDelete(id) {
    // we pass in variabless obj 
    // inside we pass all variables that mutation
    // expects to have
    this.props.mutate({variables: {id: id}})
    // refetch data from backend(refresh page, the query)
    // this.props.data is added to our comp automatically
    // by graphql from react apollo
    // one of the available func is refetch()
    .then(() => this.props.data.refetch());
  }

  renderSongs() {
    return this.props.data.songs.map(song => {
      return (
        <li key={song.id} className="collection-item">
          {song.title}
          <i 
            className="material-icons"
            onClick={(event) => this.onSongDelete(song.id)}
            >delete</i>
        </li>
      )
    })
  }

  render() {
    if(this.props.data.loading) {
      return <div>Loading ...</div>
    }
    return(
     <div>
        <ul className="collection">
          {this.renderSongs()}
        </ul>
        <Link 
          to="/songs/new"
          className="btn-floating btn-large red right"
        ><i className="material-icons">add</i></Link>
     </div>
    )
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;



// make a helper using this graphql(mutation) and then
// imediatilly invoke it with the result from this
// other helper graphql(query) and  (SongList)
export default graphql(mutation)(
  graphql(query)(SongList)
);