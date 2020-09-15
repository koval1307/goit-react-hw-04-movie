import React, { Component } from "react";
import apiKey from "../../services/api_key";
import axios from "axios";
import styles from "./cast.module.css";



export class Cast extends Component {
  state = {
    cast: null,
  };

  async componentDidMount() {
    const id = Number(this.props.match.params.id);
    const cast = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
    );

    this.setState({ cast: cast.data.cast });
  }

  render() {
    const { cast } = this.state;
    console.log(cast);
    return (
      <div>
        <h2>Cast</h2>
        {cast && (
          <ul className={styles.list}>
            {cast.map(({ cast_id, character, name, profile_path }) => {
              if (profile_path) {
                return (
                  <li key={cast_id}>
                    <h2>{name}</h2>

                    {profile_path && (
                      <img
                        className={styles.img}
                        src={`https://image.tmdb.org/t/p/w300${profile_path}`}
                        alt={name}
                      ></img>
                    )}
                    <p>{character}</p>
                  </li>
                );
              }
              return (
                <li key={cast_id}>
                  <h2>{name}</h2>

                  <img
                    className={styles.img}
                    src={
                      "https://pbs.twimg.com/profile_images/1407346896/89.jpg"
                    }
                    alt={name}
                  ></img>

                  <p>{character}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}
