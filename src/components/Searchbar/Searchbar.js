import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styles from "./search-form.module.css";

export class SearchBar extends Component {
  state = {
     value: " ",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
 
    this.setState({ value: " " });
  }
  handleChange = (event) => {
  
    this.setState({ value: event.currentTarget.value });

  };

  render() {
    return (
      <div className={styles.container}>
        <form
          className={styles.SearchForm}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <Button
            type="button"
            onClick={this.handleGoBack}
            variant="contained"
            color="secondary"
          >
            Search
          </Button>

          <TextField
            className={styles.SearchForm_input}
            id="standard-basic"
            type="text"
            name="query"
            value={this.state.value}
            placeholder="Search"
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}
