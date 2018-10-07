import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import db from "../../db";

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
      <section>
        <header className="section-header">
          <h1 className="forms-title">Your all forms</h1>
        </header>
        <ul className="forms-list">
          {isLoading && <p>Loading</p>}
          {forms.map(f => (
            <li className="list-item" key={f.id}>
              {f.name}
              <Link className="link link-highlight" to={`/${f.id}/edit`}>
                creator
              </Link>
              <Link className="link link-highlight" to={`/${f.id}`}>
                preview
              </Link>
              <Link className="link link-highlight" to={`/${f.id}/export`}>
                export
              </Link>
              <button
                className="btn btn-delete-form"
                onClick={this.handleDeleteForm}
                value={f.id}
              >
                Delete
              </button>
            </li>
          ))}
          {}
          {!isError &&
            !isLoading &&
            forms.length === 0 && (
              <Fragment>
                <p style={{ marginBottom: 10 }}>No forms...</p>
                <Link className="link link-highlight" to={"/creator"}>
                  Create one!
                </Link>
              </Fragment>
            )}
          {isError && <p>Error occured!</p>}
        </ul>
      </section>
    );
  }
}

export default Forms;
