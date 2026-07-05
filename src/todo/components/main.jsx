import { useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { Item } from "./item";
import { TOGGLE_ALL } from "../constants";

export function Main({ todos, dispatch }) {
  const { pathname: route } = useLocation();

  const visibleTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (route === "/active") return !todo.completed;
      if (route === "/completed") return todo.completed;
      return true;
    });
  }, [todos, route]);

  const toggleAll = useCallback(
    (e) => {
      dispatch({
        type: TOGGLE_ALL,
        payload: { completed: e.target.checked },
      });
    },
    [dispatch]
  );

  const allCompleted =
    visibleTodos.length > 0 &&
    visibleTodos.every((todo) => todo.completed);

  return (
    <main className="main" data-testid="main" hidden={todos.length === 0}>
      <div className="toggle-all-container">
        <input
          className="toggle-all"
          type="checkbox"
          id="toggle-all"
          data-testid="toggle-all"
          checked={allCompleted}
          onChange={toggleAll}
        />

        <label className="toggle-all-label" htmlFor="toggle-all">
          Toggle All Input
        </label>
      </div>

      <ul className="todo-list" data-testid="todo-list">
        {visibleTodos.map((todo) => (
          <Item key={todo.id} todo={todo} dispatch={dispatch} />
        ))}
      </ul>
    </main>
  );
}

Main.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      completed: PropTypes.bool,
    })
  ).isRequired,

  dispatch: PropTypes.func.isRequired,
};