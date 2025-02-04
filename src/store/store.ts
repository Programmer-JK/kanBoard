import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ColumnTypes, ProjectBoardTypes } from "@/type/common";

interface ProjectStore {
  projectBoard: ProjectBoardTypes;
  setProjectName: (name: string) => void;
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

      setProjectName: (name) => {
        set((state) => ({
          projectBoard: {
            ...state.projectBoard,
            projectName: name,
          },
        }));
      },

      addColumn: (
        status: "pending" | "planned" | "ongoing" | "completed",
        column: ColumnTypes
      ) => {
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

      updateColumn: (
        status: "pending" | "planned" | "ongoing" | "completed",
        columnId,
        updateColumn
      ) => {
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

      removeColumn: (
        status: "pending" | "planned" | "ongoing" | "completed",
        columnId
      ) => {
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
        fromStatus: "pending" | "planned" | "ongoing" | "completed",
        toStatus: "pending" | "planned" | "ongoing" | "completed",
        columnId: string
      ) => {
        set((state) => {
          const columnToMove = state.projectBoard.columns[fromStatus].find(
            (column) => column.id === columnId
          );

          if (!columnToMove) return { ...state };

          return {
            projectBoard: {
              name: state.projectBoard.name,
              columns: {
                ...state.projectBoard.columns,
                [fromStatus]: state.projectBoard.columns[fromStatus].filter(
                  (column) => column.id !== columnId
                ),
                [toStatus]: [
                  ...state.projectBoard.columns[toStatus],
                  { ...columnToMove, state: toStatus },
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
