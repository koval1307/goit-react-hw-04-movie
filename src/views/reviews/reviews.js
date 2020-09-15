import React, { Component } from "react";

import axios from "axios";

const apiKey = "add96bc16de760017b7a79136a2ecf18";

export class Reviews extends Component {
  state = {
    reviews: [],
  };
  async componentDidMount() {
    const id = Number(this.props.match.params.id);
    const reviews = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}`
    );
    this.setState({ reviews: reviews.data.results  });
 
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
