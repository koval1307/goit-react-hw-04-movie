import React, { Component } from "react";
import { Cast } from "../Cast/Cast"
import { Reviews } from "../reviews/reviews";
import axios from "axios";
import { Route, Link, Switch } from "react-router-dom";
import Button from "@material-ui/core/Button";
import styles from "./movieOverview.module.css"


const apiKey = "add96bc16de760017b7a79136a2ecf18";


class OverView extends Component {
  state = {
    movieDetails:null,
  };

  async componentDidMount() {
    const id = Number(this.props.match.params.id);
    const movieDetails = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    );
    this.setState({ ...movieDetails.data });
    console.log(this.state)
  }
  handleGoBack = () => {
    const { state } = this.props.location;
    const { history } = this.props;
    if (state) {
      history.push(state.from);
    } else {
      history.push("/");
    }
  };
  render() {
    
   
     const {
       original_title,
       vote_average,
       genres,
       release_date,
       overview,
       poster_path,
     } = this.state;
 
    return (
      <div className={styles.container}>
        <Button
          className={styles.button}
          type="button"
          onClick={this.handleGoBack}
          variant="contained"
          color="secondary"
        >
          Go back
        </Button>

        <div className={styles.card}>
          {poster_path ? (
            <img
              width="300"
              height="450"
              src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
              alt={`${original_title}`}
            />
          ) : (
            <img
              width="300"
              height="450"
              src={"https://i.imgflip.com/s3joj.jpg"}
              alt={`${original_title}`}
            />
          )}

          <div className={styles.description}>
            <h1>{original_title}</h1>
            <p>{vote_average && `User rate: ${vote_average * 10} %`}</p>
            <p>{release_date && `Release Year: ${release_date.slice(0, 4)}`}</p>
            <h2>
              Genre:{" "}
              {genres &&
                genres.map((el, i, array) => {
                  if (i !== array.length - 1) {
                    return el.name + ", ";
                  }
                  return el.name + ".";
                })}
            </h2>
            <p>{overview}</p>
          </div>
        </div>
        <ul className={styles.list}>
          <li className={styles.list__item}>
            <Link
              to={{
                pathname: `${this.props.match.url}/cast`,
              }}
            >
              Casts
            </Link>
          </li>
          <li className={styles.list__item}>
            <Link
              to={{
                pathname: `${this.props.match.url}/reviews`,
              }}
            >
              Reviews
            </Link>
          </li>
        </ul>
        <Route path={`${this.props.match.path}/cast`} component={Cast} />
        <Route path={`${this.props.match.path}/reviews`} component={Reviews} />
      </div>
    );
  }
}
export default OverView