import React from "react";

export const EditMode = ({ title, description, price, onSave, onChange }) => (
  <div>
    <input placeholder="title" name="title" value={title} onChange={onChange} />
    <input
      placeholder="description"
      name="description"
      value={description}
      onChange={onChange}
    />
    <input placeholder="price" name="price" value={price} onChange={onChange} />

    <button onClick={onSave}>Save</button>
  </div>
);
