import { MouseEventHandler, ReactElement } from "react";

export interface TagTypes {
  color: string;
  text: string;
}

export interface ColumnTypes {
  id: string;
  state: string;
  tags: TagTypes[];
  content: string;
}

export interface ProjectBoard {
  projectName: string;
  projectColumn: ColumnTypes[];
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
}

export interface CardProps {
  key: string;
  tag: Array<TagTypes>;
  contents: string;
}
