import React, { Component } from "react";

import { withDexie } from "../hoc/withDexie";
import { PreviewInput } from "./PreviewInput";

import { prepareToRender } from "../../helpers";

class Preview extends Component {
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
              ...value,
              answer: "",
              handleChange: this.handleChange(key)
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

  handleChange = id => e => {
    const { value } = e.target;
    this.setState(({ formInputs }) => ({
      formInputs: {
        ...formInputs,
        [id]: {
          ...formInputs[id],
          answer: value
        }
      }
    }));
  };

  render() {
    const { formInputs } = this.state;
    return (
      <section className="preview">
        <header className="section-header">
          <h1 className="creator-title">Preview</h1>
        </header>
        <section className="preview-content">
          {prepareToRender(formInputs).map(data => (
            <PreviewInput
              key={data.id}
              {...data}
              values={formInputs}
              parentValue={formInputs[data.id].answer}
            />
          ))}
        </section>
      </section>
    );
  }
}

export const FormPreview = withDexie(Preview);
