import React from "react";

import { InputConfig } from "./InputConfig";

export const SubInputs = ({ sub, values, id }) => (
  <div className="sub-inputs">
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
