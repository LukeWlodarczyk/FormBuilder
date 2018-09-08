import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import db from "../db";

class Forms extends Component {
  state = {
    isLoading: false,
    isError: false,
    forms: []
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    db.table("forms")
      .toArray()
      .then(forms => {
        this.setState({ forms, isLoading: false });
      })
      .catch(err => {
        this.setState({ isError: true, isLoading: false });
      });
  }

  handleDeleteForm = e => {
    const id = parseInt(e.target.value, 10);
    db.table("forms")
      .delete(id)
      .then(() => {
        this.setState({ forms: this.state.forms.filter(f => f.id !== id) });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { isLoading, isError, forms } = this.state;
    return (
      <div>
        <ul>
          {isLoading && <p>Loading</p>}
          {forms.map(f => (
            <li key={f.id}>
              <Link to={`/${f.id}/edit`}>{f.name}</Link>
              <button onClick={this.handleDeleteForm} value={f.id}>
                Delete
              </button>
            </li>
          ))}
          {}
          {!isError &&
            !isLoading &&
            forms.length === 0 && (
              <Fragment>
                <p>No forms...</p>
                <Link to={"/creator"}>Create one!</Link>
              </Fragment>
            )}
          {isError && <p>Error occured!</p>}
        </ul>
      </div>
    );
  }
}

export default Forms;
