import React, { Fragment } from "react";

export const Inputs = ({
  subInput,
  values,
  id,
  handleChangeCondition,
  handleChange,
  condition,
  parentAnswerType
}) => (
  <Fragment>
    {subInput && (
      <div className="form-group form-group-condition">
        <label>Condition</label>
        <div>
          <select
            value={values[id].condition.type}
            style={{ marginRight: 5 }}
            name="type"
            onChange={handleChangeCondition}
          >
            {condition[parentAnswerType].options.map(i => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          {parentAnswerType !== "yes/no" ? (
            <input
              className="input"
              name="expect"
              value={values[id].condition.expect}
              type={condition[parentAnswerType].input.type}
              onChange={handleChangeCondition}
            />
          ) : (
            <select
              name="expect"
              value={values[id].condition.expect}
              onChange={handleChangeCondition}
            >
              {condition[parentAnswerType].select.options.map(o => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    )}
    <div className="form-group">
      <label>Question</label>
      <input
        className="input"
        name="question"
        type="text"
        value={values[id].question}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label>Type</label>
      <select name="type" value={values[id].type} onChange={handleChange}>
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="yes/no">Yes/No</option>
      </select>
    </div>
  </Fragment>
);
