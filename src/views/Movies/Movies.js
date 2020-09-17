import React, { Component } from "react";
import { SearchBar } from "../../components/Searchbar/Searchbar";
import { Link } from "react-router-dom";
import styles from "./movies.module.css";
import { fetchMovieSearch } from "../../services/apiService";
import getQueryParams from "../../services/getQueryParams";
import Spinner from "../../components/Loader/Loader";

class Movies extends Component {
  state = {
    movies: [],
    loading: false,
    value:null,
  };

  componentDidMount() {
    const { query } = getQueryParams(this.props.location.search);
    
    if (query) {
      this.fetchMovies(query);
      // this.setState({ input: query })
      console.log(this.props.location.search)
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = getQueryParams(prevProps.location.search);
    const { query: nextQuery } = getQueryParams(this.props.location.search);
    
    if (prevQuery !== nextQuery) {
      this.fetchMovies(nextQuery);
    }
  }

  fetchMovies = (query) => {
    fetchMovieSearch(query).then((movies) => this.setState({ movies }));
  };

  onChangeQuery = (query) => {
 
    this.props.history.push({
      ...this.props.location,
      search: `query=${query}`,
      
    });
  
    this.setState({ input: "sda" })
    console.log(this.state)
  };

  handleGoBack = () => {
    const { state } = this.props.location;

    if (state && state.from) {
      this.props.history.push(state.from);
    }
  };

  render() {
    const { movies, loading } = this.state;
    const { match } = this.props;
console.log(getQueryParams(this.props.location.search));
    return (
      <div>
        <h1 className={styles.title}>Поиск фильмов</h1>
        <SearchBar onSubmit={this.onChangeQuery} />
        {loading && <Spinner />}
        {movies && (
          <ul className={styles.list}>
            {movies.map(({ id, title, overview, name }) => (
              <li className={styles.list__item} key={id}>
                <Link
                  className={styles.link}
                  to={{
                    pathname: `${match.url}/${id}`,
                    state: {
                      from: this.props.location,
                    search: this.props.location.search },
                  }}
                >
                  {title || name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Movies;
