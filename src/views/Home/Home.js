import React, { Component } from 'react'
import axios from "axios";
import styles from "./home.module.css"
import { Route, Link, Switch} from "react-router-dom"

class HomeView extends Component {
  state = {
   movies: [],
  };

  async componentDidMount() {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=add96bc16de760017b7a79136a2ecf18`
    );
    this.setState({ movies: response.data.results });
    console.log(this.state)
  }

  render() {
    const { movies } = this.state;
 
    return (
      <div>
        <h1 className={styles.title}>Популярные фильмы</h1>
        <ul className={styles.list}>
          {movies.map(({ id, title }) => (
            <li  className={styles.list__item} key={id}>
              <Link
                className={styles.link}
                to={{
                  pathname: `/movies/${id}`,
                  state: { from: this.props.location },
                }}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default  HomeView