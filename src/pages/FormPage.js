import React, { useState } from "react";
import "../styles/FormPage.css";

const formConfig = [
  {
    label: "Name",
    name: "name",
    type: "text",
    placeholder: "Enter name",
  },
  {
    label: "Age",
    name: "age",
    type: "number",
    placeholder: "Enter age",
  },
  {
    label: "Gender",
    name: "gender",
    type: "select",
    options: ["Male", "Female", "Other"],
  },
  {
    label: "Subscribe",
    name: "subscribe",
    type: "checkbox",
  },
];

const FormPage = () => {
  const [formState, setFormState] = useState({});

  const handleChange = (e, field) => {
    const { name, value, checked, type } = e.target;
    setFormState({
      ...formState,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="form-page">
      <h2 className="form-title">Dynamic Form</h2>
      <form className="form-container">
        {formConfig.map((field) => (
          <div className="form-field" key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === "text" || field.type === "number" ? (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                value={formState[field.name] || ""}
                onChange={(e) => handleChange(e, field)}
              />
            ) : field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                value={formState[field.name] || ""}
                onChange={(e) => handleChange(e, field)}
              >
                <option value="">Select</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === "checkbox" ? (
              <input
                type="checkbox"
                id={field.name}
                name={field.name}
                checked={formState[field.name] || false}
                onChange={(e) => handleChange(e, field)}
              />
            ) : null}
          </div>
        ))}
      </form>

      {/* 디버깅용 출력 */}
      <pre className="form-output">{JSON.stringify(formState, null, 2)}</pre>
    </div>
  );
};

export default FormPage;
