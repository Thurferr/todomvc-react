import React, { useCallback } from "react";
import PropTypes from "prop-types";

export function Input({
  onSubmit,
  placeholder,
  label,
  defaultValue,
  onBlur,
  editing = false,
}) {
  const handleBlur = useCallback(
    (e) => {
      if (!onBlur) return;

      const value = e.target.value.trim();
      onBlur(value);
    },
    [onBlur]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key !== "Enter") return;
      if (!onSubmit) return;

      const value = e.target.value.trim();

      if (!editing && value.length === 0) return;

      onSubmit(value);

      // limpa apenas no modo criação
      if (!editing) {
        e.target.value = "";
      }
    },
    [onSubmit, editing]
  );

  return (
    <input
      className={editing ? "edit" : "new-todo"}
      type="text"
      data-testid="text-input"
      autoFocus
      aria-label={label}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  );
}

Input.propTypes = {
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  onBlur: PropTypes.func,
  editing: PropTypes.bool,
};