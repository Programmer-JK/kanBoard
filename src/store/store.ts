import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ColumnTypes, ProjectBoardTypes, StateType } from "@/type/common";

interface ProjectStore {
  projectBoard: ProjectBoardTypes;
  setStoreProjectName: (targetName: string) => void;
  addColumn: (column: ColumnTypes) => void;
  removeColumn: (columnState: StateType, columnId: string) => void;
  updateColumn: (
    columnState: StateType,
    columnId: string,
    updateColumn: Partial<ColumnTypes>
  ) => void;
  addCard: (columnState: StateType, column: ColumnTypes) => void;
  removeCard: (targetColumn: ColumnTypes) => void;
  moveCard: (
    fromState: StateType,
    toState: StateType,
    columnId: string,
    toIndex: number
  ) => void;
}

export const useKanStore = create(
  persist<ProjectStore>(
    (set) => ({
      projectBoard: {
        name: "",
        columns: {
          pending: [],
          planned: [],
          ongoing: [],
          completed: [],
        },
      },

      setStoreProjectName: (targetName) => {
        set((state) => ({
          projectBoard: {
            ...state.projectBoard,
            name: targetName,
          },
        }));
      },

      addColumn: (column: ColumnTypes) => {
        set((state) => ({
          projectBoard: {
            ...state.projectBoard,
            columns: {
              ...state.projectBoard.columns,
              ["pending"]: [...state.projectBoard.columns["pending"], column],
            },
          },
        }));
      },

      removeColumn: (columnState: StateType, columnId) => {
        set((state) => {
          if (columnState !== "pending") return state;
          return {
            projectBoard: {
              ...state.projectBoard,
              columns: {
                ...state.projectBoard.columns,
                ["pending"]: state.projectBoard.columns["pending"].filter(
                  (column) => column.id !== columnId
                ),
              },
            },
          };
        });
      },

      updateColumn: (columnState: StateType, columnId, updateColumn) => {
        console.log("a", columnState, columnId, updateColumn);
        set((state) => ({
          projectBoard: {
            ...state.projectBoard,
            columns: {
              ...state.projectBoard.columns,
              [columnState]: state.projectBoard.columns[columnState].map(
                (column) =>
                  column.id === columnId
                    ? { ...column, ...updateColumn }
                    : column
              ),
            },
          },
        }));
      },

      addCard: (columnState: StateType, column: ColumnTypes) => {
        set((state) => {
          if (column.state !== "pending") return state;
          column.state = columnState;
          return {
            projectBoard: {
              ...state.projectBoard,
              columns: {
                ...state.projectBoard.columns,
                [columnState]: [
                  ...state.projectBoard.columns[columnState],
                  column,
                ],
              },
            },
          };
        });
      },

      removeCard: (targetColumn: ColumnTypes) => {
        set((state) => {
          const targetState = targetColumn.state;
          if (targetState === "pending") {
            return state;
          }
          const newPendingColumns = state.projectBoard.columns.pending.map(
            (column) =>
              column.id === targetColumn.id
                ? { ...column, state: "pending" as StateType }
                : column
          );

          return {
            ...state,
            projectBoard: {
              ...state.projectBoard,
              columns: {
                ...state.projectBoard.columns,
                ["pending"]: newPendingColumns,
                [targetState]: state.projectBoard.columns[targetState].filter(
                  (column) => column.id !== targetColumn.id
                ),
              },
            },
          };
        });
      },

      moveCard: (
        fromState: StateType,
        toState: StateType,
        columnId: string,
        toIndex: number
      ) => {
        set((state) => {
          if (fromState === toState) {
            const columns = [...state.projectBoard.columns[fromState]];
            const fromIndex = columns.findIndex(
              (column) => column.id === columnId
            );
            const [movedColumn] = columns.splice(fromIndex, 1);
            columns.splice(toIndex, 0, movedColumn);
            return {
              projectBoard: {
                name: state.projectBoard.name,
                columns: {
                  ...state.projectBoard.columns,
                  [fromState]: columns,
                },
              },
            };
          }

          const columnToMove = state.projectBoard.columns[fromState].find(
            (column) => column.id === columnId
          );

          if (!columnToMove) return { ...state };

          const newFromStateColumns = state.projectBoard.columns[
            fromState
          ].filter((column) => column.id !== columnId);

          const newToStateColumns = [...state.projectBoard.columns[toState]];
          newToStateColumns.splice(toIndex, 0, {
            ...columnToMove,
            state: toState,
          });

          const newPendingColumns = state.projectBoard.columns.pending.map(
            (column) =>
              column.id === columnId ? { ...column, state: toState } : column
          );

          return {
            projectBoard: {
              name: state.projectBoard.name,
              columns: {
                ...state.projectBoard.columns,
                pending: newPendingColumns,
                [fromState]: newFromStateColumns,
                [toState]: newToStateColumns,
              },
            },
          };
        });
      },
    }),
    {
      name: "kan-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
