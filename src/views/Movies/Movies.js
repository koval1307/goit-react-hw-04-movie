import React, { Component } from "react";
import Axios from "axios";
import { SearchBar } from "../../components/Searchbar/Searchbar";
import {  Link} from "react-router-dom";
import styles from "./movies.module.css";
import apiKey from "../../services/api_key"




class Movies extends Component {
  state = {
    movies: [],
  };
  componentDidMount() {}
  onChangeQuery = (query) => {
    Axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`
    ).then((response) => {
   
      this.setState({
        movies: response.data.results,
      });
    });
  };
  handleGoBack = () => {
    const { state } = this.props.location;

    if (state && state.from) {
      return this.props.history.push(state.from);
    }

    this.props.history.push("/movies");
  };

  render() {
    console.log(this.props.match.url);
    const { movies } = this.state;
    const { match } = this.props;

    return (
      <div>
        <h1 className={styles.title}>Поиск фильмов</h1>
        <SearchBar onSubmit={this.onChangeQuery} />
        <ul className={styles.list}>
          {movies.map(({ id, title, overview }) => (
            <li className={styles.list__item} key={id}>
              <h2>
                <Link
                   className={styles.link}
                  to={{
                    pathname: `/movies/${id}`,
                    state: { from: this.props.location },
                  }}
                >
                  {title}
                </Link>
              </h2>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Movies;
