import React, { Component } from "react";
import {fetchMovieReviews} from "../../services/apiService"


export class Reviews extends Component {
  state = {
    reviews: [],
  };
  async componentDidMount() {
    const id = Number(this.props.match.params.id);
    const reviews = await fetchMovieReviews(id)
    this.setState({ reviews: reviews  });
 
  }

  render() {
    const { reviews } = this.state;
      return (
        <ul>
          {reviews.length > 0 ? (
            reviews.map(({ id, author, content }) => {
              return (
                <li key={id}>
                  <h2> {author}</h2> <span>{content}</span>
                </li>
              );
            })
          ) : (
            <p>No Reviews</p>
          )}
        </ul>
      );
  }
}
