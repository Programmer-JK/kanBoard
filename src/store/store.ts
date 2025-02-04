import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ColumnTypes, ProjectBoard } from "@/type/common";

interface ProjectStore {
  projectBoard: ProjectBoard;
  setProjectName: (name: string) => void;
  addColumn: (column: ColumnTypes) => void;
  updateColumn: (columnId: string, updateColumn: Partial<ColumnTypes>) => void;
  removeColumn: (columnId: string) => void;
}

export const useKanStore = create(
  persist<ProjectStore>(
    (set) => ({
      projectBoard: {
        projectName: "",
        projectColumn: [],
      },
      setProjectName: (name) =>
        set((state) => ({
          projectBoard: {
            ...state.projectBoard,
            projectName: name,
          },
        })),
      addColumn: (column: ColumnTypes) =>
        set((state) => ({
          projectBoard: {
            ...state.projectBoard,
            projectColumn: [...state.projectBoard.projectColumn, column],
          },
        })),
      updateColumn: (columnId, updateColumn) =>
        set((state) => ({
          projectBoard: {
            ...state.projectBoard,
            projectColumn: state.projectBoard.projectColumn.map((column) =>
              column.id === columnId ? { ...column, ...updateColumn } : column
            ),
          },
        })),
      removeColumn: (columnId) =>
        set((state) => ({
          projectBoard: {
            ...state.projectBoard,
            projectColumn: state.projectBoard.projectColumn.filter(
              (column) => column.id !== columnId
            ),
          },
        })),
    }),
    {
      name: "kan-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
