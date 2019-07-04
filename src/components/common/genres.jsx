import React, { Component } from "react";
import { getGenres } from "../../services/fakeGenreService";

class Genres extends Component {
  state = {
    genres: getGenres()
  };
  componentWillMount = () => {
    this.state.genres.push({ _id: "1", name: "All Genres" });
  };

  render() {
    return (
      <ul className="list-group">
        {this.state.genres.map(genre => (
          <li
            key={genre._id}
            onClick={() => this.props.onClick(genre)}
            className={
              this.props.currentGenre._id === genre._id
                ? "btn list-group-item active"
                : "btn list-group-item"
            }
          >
            {genre.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default Genres;
