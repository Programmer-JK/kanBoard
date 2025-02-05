import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ColumnTypes, ProjectBoardTypes, StateType } from "@/type/common";

interface ProjectStore {
  projectBoard: ProjectBoardTypes;
  setStoreProjectName: (targetName: string) => void;
  addColumn: (
    status: keyof ProjectBoardTypes["columns"],
    column: ColumnTypes
  ) => void;
  updateColumn: (
    status: keyof ProjectBoardTypes["columns"],
    columnId: string,
    updateColumn: Partial<ColumnTypes>
  ) => void;
  removeColumn: (
    status: keyof ProjectBoardTypes["columns"],
    columnId: string
  ) => void;
  moveColumn: (
    fromState: StateType,
    toState: StateType,
    columnId: string
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

      addColumn: (status: StateType, column: ColumnTypes) => {
        set((state) => ({
          projectBoard: {
            ...state.projectBoard,
            columns: {
              ...state.projectBoard.columns,
              [status]: [...state.projectBoard.columns[status], column],
            },
          },
        }));
      },

      updateColumn: (status: StateType, columnId, updateColumn) => {
        set((state) => ({
          projectBoard: {
            ...state.projectBoard,
            columns: {
              ...state.projectBoard.columns,
              [status]: state.projectBoard.columns[status].map((column) =>
                column.id === columnId ? { ...column, ...updateColumn } : column
              ),
            },
          },
        }));
      },

      removeColumn: (status: StateType, columnId) => {
        set((state) => ({
          projectBoard: {
            ...state.projectBoard,
            columns: {
              ...state.projectBoard.columns,
              [status]: state.projectBoard.columns[status].filter(
                (column) => column.id !== columnId
              ),
            },
          },
        }));
      },

      moveColumn: (
        fromState: StateType,
        toState: StateType,
        columnId: string
      ) => {
        set((state) => {
          const columnToMove = state.projectBoard.columns[fromState].find(
            (column) => column.id === columnId
          );

          if (!columnToMove) return { ...state };

          return {
            projectBoard: {
              name: state.projectBoard.name,
              columns: {
                ...state.projectBoard.columns,
                [fromState]: state.projectBoard.columns[fromState].filter(
                  (column) => column.id !== columnId
                ),
                [toState]: [
                  ...state.projectBoard.columns[toState],
                  { ...columnToMove, state: toState },
                ],
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
