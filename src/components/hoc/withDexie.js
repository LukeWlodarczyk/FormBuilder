import React, { Component } from "react";

import { DB } from "../../db";

const db = new DB();

export const withDexie = Component => props => (
  <Component
    {...props}
    db={{
      getAllFroms: db.getAll,
      addForm: db.add,
      getFormById: db.getById,
      deleteFormById: db.deleteById,
      updateFormById: db.updateById
    }}
  />
);
