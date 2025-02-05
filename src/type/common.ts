import { MouseEventHandler, ReactElement } from "react";

export type StateType = "pending" | "planned" | "ongoing" | "completed";

export interface TagTypes {
  color: string;
  text: string;
}

export interface ColumnTypes {
  id: string;
  state: StateType;
  tags: TagTypes[];
  content: string;
}

export interface ProjectBoardTypes {
  name: string;
  columns: {
    pending: ColumnTypes[];
    planned: ColumnTypes[];
    ongoing: ColumnTypes[];
    completed: ColumnTypes[];
  };
}

export interface ColorPickerProps {
  onColorSelect: (color: string) => void;
}

export interface AddCardProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void; // onClose 타입 정의
  children: ReactElement;
}

export interface ChildrenModalProps {
  onClose: () => void;
  columnData?: ColumnTypes;
  targetState?: StateType;
}

export interface CardProps {
  column: ColumnTypes;
}
