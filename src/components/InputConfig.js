import React from "react";

const condition = {
  text: {
    options: ["equals"],
    input: {
      type: "text"
    }
  },
  number: {
    options: ["equals", "greater than", "less than"],
    input: {
      type: "number"
    }
  },
  "yes/no": {
    options: ["equals"],
    select: {
      options: ["Yes", "No"]
    }
  }
};

const InputConfig = ({
  values,
  handleChange,
  handleChangeCondition,
  deleteInput,
  addSubInput,
  sub,
  id,
  subInput,
  parentAnswerType
}) => (
  <div style={{ marginLeft: subInput ? 5 : 0 }}>
    {subInput && (
      <div>
        <select
          value={values[id].condition.type}
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
    )}
    <input
      name="question"
      type="text"
      value={values[id].question}
      onChange={handleChange}
    />
    <select name="type" value={values[id].type} onChange={handleChange}>
      <option value="text">Text</option>
      <option value="number">Number</option>
      <option value="yes/no">Yes/No</option>
    </select>
    <button onClick={deleteInput}>Delete</button>
    <button onClick={addSubInput}>Add Sub Input</button>
    {!!sub.length &&
      sub.map(data => (
        <InputConfig
          key={data.id}
          {...data}
          {...{ parentAnswerType: values[id].type }}
          values={values}
        />
      ))}
  </div>
);

export default InputConfig;
