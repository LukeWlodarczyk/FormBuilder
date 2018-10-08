import React, { Component } from "react";

import { withDexie } from "../hoc/withDexie";

class Export extends Component {
  state = {
    formInputs: {}
  };

  componentDidMount() {
    const id = parseInt(this.props.match.params.id, 10);
    if (id) {
      this.props.db
        .getFormById(id)
        .then(data => {
          const form = Object.entries(data.form).reduce((obj, [key, value]) => {
            obj[key] = {
              ...value
            };
            return obj;
          }, {});
          this.setState({
            formInputs: form
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    const { formInputs } = this.state;
    return (
      <section className="export">
        <header className="section-header">
          <h1 className="export-title">Export</h1>
        </header>
        <section className="export-content">
          <textarea
            readOnly
            cols="60"
            rows="15"
            value={JSON.stringify(formInputs)}
          />
        </section>
      </section>
    );
  }
}

export const FormExport = withDexie(Export);
