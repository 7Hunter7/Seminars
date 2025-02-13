import React from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal__content">
        <p>{message}</p>
        <button onClick={onConfirm}>Подтвердить</button>
        <button onClick={onClose}>Отмена</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
