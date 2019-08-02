import React from "react";


export default function TextInputGroup({
  label,
  name,
  placeholder,
  type
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
}
