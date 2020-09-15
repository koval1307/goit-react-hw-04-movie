import React, { Component } from "react";
import apiKey from "../../services/api_key";
import axios from "axios";



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
