export const prepareToRender = object => {
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
