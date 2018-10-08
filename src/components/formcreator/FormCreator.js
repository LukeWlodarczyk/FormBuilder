import React, { Component } from "react";
import ShortUniqueId from "short-unique-id";

import { withDexie } from "../hoc/withDexie";

import { InputConfig } from "./InputConfig";

class Creator extends Component {
  state = {
    uid: new ShortUniqueId(),
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
              addSubInput: this.addSubInput(key),
              handleChange: this.handleChange(key),
              deleteInput: this.deleteInput(key),
              ...(value.subInput && {
                handleChangeCondition: this.handleChangeCondition(key)
              })
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

  randomId = () => this.state.uid.randomUUID(6);

  addInput = () => {
    const id = this.randomId();

    const newInput = {
      [id]: {
        id,
        question: "",
        type: "text",
        addSubInput: this.addSubInput(id),
        handleChange: this.handleChange(id),
        deleteInput: this.deleteInput(id)
      }
    };

    this.setState(({ formInputs }) => ({
      formInputs: {
        ...formInputs,
        ...newInput
      }
    }));
  };

  addSubInput = parentId => () => {
    const id = `${parentId}/${this.randomId()}`;

    const newSubInput = {
      [id]: {
        id,
        condition: {
          type: "equals",
          expect: "Yes"
        },
        question: "",
        subInput: true,
        type: "text",
        addSubInput: this.addSubInput(id),
        handleChange: this.handleChange(id),
        deleteInput: this.deleteInput(id),
        handleChangeCondition: this.handleChangeCondition(id)
      }
    };

    this.setState(({ formInputs }) => ({
      formInputs: {
        ...formInputs,
        ...newSubInput
      }
    }));
  };

  handleChange = id => e => {
    const { name, value } = e.target;
    this.setState(({ formInputs }) => ({
      formInputs: {
        ...formInputs,
        [id]: {
          ...formInputs[id],
          [name]: value
        }
      }
    }));
  };

  handleChangeCondition = id => e => {
    const { name, value } = e.target;
    this.setState(({ formInputs }) => ({
      formInputs: {
        ...formInputs,
        [id]: {
          ...formInputs[id],
          condition: {
            ...formInputs[id].condition,
            [name]: value
          }
        }
      }
    }));
  };

  deleteInput = id => () => {
    this.setState(({ formInputs }) => {
      const newFormInputs = formInputs;

      for (const key in newFormInputs) {
        if (key.includes(id)) {
          delete newFormInputs[key];
        }
      }

      return {
        formInputs: {
          ...newFormInputs
        }
      };
    });
  };

  prepareToRender = object => {
    const lookup = Symbol();
    const root = { [lookup]: {}, sub: [] };

    for (const el of Object.values(object)) {
      let parent = root;
      for (const part of el.id.split("/")) {
        if (!parent[lookup][part])
          parent.sub.push((parent[lookup][part] = { [lookup]: {}, sub: [] }));
        parent = parent[lookup][part];
      }
      Object.assign(parent, el);
    }

    return root.sub;
  };

  saveForm = () => {
    const isFormEmpty = !Object.keys(this.state.formInputs).length;

    if (isFormEmpty) return;

    const name = prompt("Type in name of your form");
    const form = JSON.parse(JSON.stringify(this.state.formInputs));

    if (name) {
      const newForm = {
        name,
        form
      };

      this.props.db
        .addForm(newForm)
        .then(() => {
          this.props.history.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  updateForm = () => {
    const form = JSON.parse(JSON.stringify(this.state.formInputs));
    const id = parseInt(this.props.match.params.id, 10);

    this.props.db
      .updateFormById(id, { form })
      .then(() => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { formInputs } = this.state;

    return (
      <section className="creator">
        <header className="section-header">
          <h1 className="creator-title">Creator</h1>
        </header>
        <section className="creator-content">
          {this.prepareToRender(formInputs).map(data => (
            <InputConfig key={data.id} {...data} values={formInputs} />
          ))}
        </section>
        <div className="action-btns">
          <button className="btn" onClick={this.addInput}>
            Add input
          </button>
          {this.props.match.params.id ? (
            <button className="btn" onClick={this.updateForm}>
              Update form
            </button>
          ) : (
            <button className="btn" onClick={this.saveForm}>
              Save form
            </button>
          )}
        </div>
      </section>
    );
  }
}

export const FormCreator = withDexie(Creator);
