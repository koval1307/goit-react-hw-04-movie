import React, { Component } from "react";
import { Cast } from "../Cast/Cast";
import { Reviews } from "../reviews/reviews";

import { Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import styles from "./movieOverview.module.css";

import routes from "../../services/routes";
import Spinner from "../../components/Loader/Loader";
import { fetchMoiveOverview } from "../../services/apiService";

class OverView extends Component {
  state = { 
    loading: false,
    movieDetails: null,
    historySearch: null
  };

  async componentDidMount() {
    const id = Number(this.props.match.params.id);

    const movieDetails = await fetchMoiveOverview(id);
console.log(movieDetails)
    this.setState({ ...movieDetails });
    this.setState({ historySearch: this.props.location.state.from });
    console.log(this.state)
  }
  handleGoBack = () => {
    const { state } = this.props.location;
    const {history} = this.props
    if (this.state.historySearch) {
      history.push(this.state.historySearch);
      if (state) {
        history.push(state.from);
      }
      else {
         history.push("/");
      }
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
      loading,
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
        {loading && <Spinner />}
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
              <ul>
                {genres && genres.map((el) => <li key={el.id}>{el.name}</li>)}
              </ul>
            </h2>
            <p>{overview}</p>
          </div>
        </div>
        <ul className={styles.list}>
          <li className={styles.list__item}>
            <Link
              to={{
                pathname: `${this.props.match.url}/cast`,
                state: { from: this.state.historySearch },
              }}
            >
              Casts
            </Link>
          </li>
          <li className={styles.list__item}>
            <Link
              to={{
                pathname: `${this.props.match.url}/reviews`,
                state: { from: this.state.historySearch },
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
export default OverView;
