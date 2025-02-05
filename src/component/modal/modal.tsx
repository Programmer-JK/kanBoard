import React from "react";
import { X } from "lucide-react";
import { ModalProps } from "@/type/common";

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  const childrenWithProps = React.cloneElement(children, { onClose });

  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0 
        flex items-center justify-center 
        z-50 bg-black/60
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative h-fit 
          bg-gray-200 rounded-lg p-6 
          max-w-xl w-full mx-4 z-10
        "
      >
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4 
            hover:bg-gray-100 
            p-1 rounded-full 
            transition-colors
          "
        >
          <X size={20} />
        </button>
        {childrenWithProps}
      </div>
    </div>
  );
};

export default Modal;
