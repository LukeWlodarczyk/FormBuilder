import React from "react";

import Inputs from "./Inputs";
import SubInputs from "./SubInputs";

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
  <div className="input-config" style={{ marginLeft: subInput ? 5 : 0 }}>
    <Inputs
      subInput={subInput}
      values={values}
      id={id}
      handleChangeCondition={handleChangeCondition}
      handleChange={handleChange}
      condition={condition}
      parentAnswerType={parentAnswerType}
    />
    <div className="sub-action-btns">
      <button className="btn" onClick={deleteInput}>
        Delete
      </button>
      <button className="btn" onClick={addSubInput}>
        Add Sub-Input
      </button>
    </div>
    <SubInputs sub={sub} values={values} id={id} />
  </div>
);

export default InputConfig;
