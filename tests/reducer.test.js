import { todoReducer } from "../src/todo/reducer";
import {
  ADD_ITEM,
  UPDATE_ITEM,
  REMOVE_ITEM,
  TOGGLE_ITEM,
  REMOVE_ALL_ITEMS,
  TOGGLE_ALL,
  REMOVE_COMPLETED_ITEMS,
} from "../src/todo/constants";

describe("todoReducer", () => {
  test("adiciona uma tarefa", () => {
    const state = [];

    const action = {
      type: ADD_ITEM,
      payload: {
        title: "Estudar testes",
      },
    };

    const result = todoReducer(state, action);

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Estudar testes");
    expect(result[0].completed).toBe(false);
    expect(result[0].id).toBeDefined();
  });

  test("atualiza uma tarefa", () => {
    const state = [
      {
        id: "1",
        title: "Antigo",
        completed: false,
      },
    ];

    const action = {
      type: UPDATE_ITEM,
      payload: {
        id: "1",
        title: "Novo",
      },
    };

    const result = todoReducer(state, action);

    expect(result[0].title).toBe("Novo");
  });

  test("remove uma tarefa", () => {
    const state = [
      { id: "1", title: "A", completed: false },
      { id: "2", title: "B", completed: false },
    ];

    const action = {
      type: REMOVE_ITEM,
      payload: {
        id: "1",
      },
    };

    const result = todoReducer(state, action);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  test("marca uma tarefa como concluída", () => {
    const state = [
      { id: "1", title: "Teste", completed: false },
    ];

    const action = {
      type: TOGGLE_ITEM,
      payload: {
        id: "1",
      },
    };

    const result = todoReducer(state, action);

    expect(result[0].completed).toBe(true);
  });

  test("remove todas as tarefas", () => {
    const state = [
      { id: "1", title: "A", completed: false },
      { id: "2", title: "B", completed: true },
    ];

    const result = todoReducer(state, {
      type: REMOVE_ALL_ITEMS,
    });

    expect(result).toEqual([]);
  });

  test("marca todas como concluídas", () => {
    const state = [
      { id: "1", title: "A", completed: false },
      { id: "2", title: "B", completed: false },
    ];

    const action = {
      type: TOGGLE_ALL,
      payload: {
        completed: true,
      },
    };

    const result = todoReducer(state, action);

    expect(result.every(todo => todo.completed)).toBe(true);
  });

  test("remove apenas as tarefas concluídas", () => {
    const state = [
      { id: "1", title: "A", completed: false },
      { id: "2", title: "B", completed: true },
      { id: "3", title: "C", completed: false },
    ];

    const result = todoReducer(state, {
      type: REMOVE_COMPLETED_ITEMS,
    });

    expect(result).toHaveLength(2);
    expect(result.find(todo => todo.id === "2")).toBeUndefined();
  });

  test("lança erro para ação desconhecida", () => {
    expect(() =>
      todoReducer([], {
        type: "INVALIDO",
      })
    ).toThrow();
  });
});