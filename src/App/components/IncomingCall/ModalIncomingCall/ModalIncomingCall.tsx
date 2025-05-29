import React, { useEffect, useState } from "react";
import icons from "../../../shared/icons";

interface ModalProps {
  children: any;
  title: string;
  isOpen: boolean;
  onClose?: () => void;
}

export default function ModalIncomingCall({
  children,
  title,
  isOpen,
  onClose,
}: ModalProps) {
  const modalClose = () => {
    onClose && onClose();
  };

  return (
    <div className="medpult-modal-overloy" onClick={modalClose}>
      <div
        className="medpult-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="medpult-modal__content__header">
          <span>{title}</span>
          <span className="medpult-modal__content__close" onClick={modalClose}>
            {icons.Cross}
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
