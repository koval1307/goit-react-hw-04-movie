import React, { Component } from 'react'
import styles from "./home.module.css"
import {  Link, } from "react-router-dom"
import {fetchPopularMovies} from "../../services/apiService"

import Spinner from "../../components/Loader/Loader"

class HomeView extends Component {
  state = {
    movies: [],
    loading:false,
  };

  async componentDidMount() {
    const response = await fetchPopularMovies 
    this.setState({ movies: response.data.results });
    console.log(this.state)
  }

  render() {
    const { movies, loading } = this.state;
 
    return (
      <div>
        <h1 className={styles.title}>Популярные фильмы</h1>
        {loading && <Spinner />}
        {movies && (
          <ul className={styles.list}>
            {movies.map(({ id, title, name }) => (
              <li className={styles.list__item} key={id}>
                <Link
                  className={styles.link}
                  to={{
                    pathname: `movies/${id}`,
                    state: { from: this.props.location.pathname },
                    
                  }}
                >
                  {name|| title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default  HomeView