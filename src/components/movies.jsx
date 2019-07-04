import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import Genres from "./common/genres";
class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
    currentGenre: { _id: "1", name: "All Genres" }
  };

  toggleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = genre => {
    this.setState({ currentGenre: genre });
  };

  render() {
    const { pageSize, currentPage, currentGenre, movies } = this.state;
    const selectedMovies =
      currentGenre._id !== "1"
        ? movies.filter(m => m.genre._id === currentGenre._id)
        : movies;

    const moviesCount = selectedMovies.length;
    if (moviesCount === 0) return <h3>There are no movies in db</h3>;
    const paginatedmovies = paginate(selectedMovies, currentPage, pageSize);
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <Genres
              currentGenre={currentGenre}
              onClick={this.handleGenreChange}
            />
          </div>
          <div className="col">
            <h3>{moviesCount} movies </h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Stock</th>
                  <th>rate</th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                {paginatedmovies.map(movie => (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Like
                        liked={movie.like}
                        onClick={() => this.toggleLike(movie)}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => this.eraseMovie(movie)}
                        className="btn btn-danger btn-sm"
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              itemsCount={moviesCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }

  eraseMovie = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };
}

export default Movies;
