export const shouldRenderSubs = (conditionType, parentValue, expectValue) => {
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
