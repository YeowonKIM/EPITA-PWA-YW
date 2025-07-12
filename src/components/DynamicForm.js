import React from "react";

const DynamicForm = ({ data, onChange, values }) => {
  const renderField = (field) => {
    const { label, name, type, options, placeholder } = field;
    const value = values[name] ?? "";

    switch (type) {
      case "text":
      case "number":
        return (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="border px-2 py-1 w-full rounded"
          />
        );
      case "select":
        return (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="border px-2 py-1 w-full rounded"
          >
            <option value="">Select</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      case "checkbox":
        return (
          <input
            type="checkbox"
            name={name}
            checked={value}
            onChange={onChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form className={`grid gap-4 ${data.layout === "2-column" ? "grid-cols-2" : "grid-cols-1"}`}>
      {data.fields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label className="mb-1 font-medium">{field.label}</label>
          {renderField(field)}
        </div>
      ))}
    </form>
  );
};

export default DynamicForm;
