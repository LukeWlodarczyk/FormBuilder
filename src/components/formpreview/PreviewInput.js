import React, { Fragment } from "react";

const shouldRenderSubs = (conditionType, parentValue, expectValue) => {
  if (!parentValue) {
    return false;
  }

  if (conditionType === "equals") return parentValue === expectValue;

  if (conditionType === "greater than")
    return parseInt(parentValue, 10) > parseInt(expectValue, 10);

  if (conditionType === "less than")
    return parseInt(parentValue, 10) < parseInt(expectValue, 10);

  return false;
};

export const PreviewInput = data => (
  <Fragment>
    <div className="input-preview">
      <p>{data.question}</p>
      {data.type !== "yes/no" ? (
        <input
          type={data.type}
          value={data.values[data.id].answer}
          onChange={data.handleChange}
        />
      ) : (
        <Fragment>
          Yes{" "}
          <input
            type="radio"
            checked={data.values[data.id].answer === "Yes"}
            value="Yes"
            onChange={data.handleChange}
          />
          No{" "}
          <input
            type="radio"
            checked={data.values[data.id].answer === "No"}
            value="No"
            onChange={data.handleChange}
          />
        </Fragment>
      )}
    </div>
    <div style={{ marginLeft: data.id.split("/").length * 10 }}>
      {data.sub.map(
        subData =>
          shouldRenderSubs(
            subData.condition.type,
            data.parentValue,
            subData.condition.expect
          ) && (
            <PreviewInput
              {...subData}
              key={subData.id}
              values={data.values}
              parentValue={subData.answer}
            />
          )
      )}
    </div>
  </Fragment>
);
