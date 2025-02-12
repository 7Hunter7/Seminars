import React, { useState, useEffect } from "react";

const SystemMessage = ({ message, onClose, type = "success" }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Ожидание окончания анимации
    }, 3000); // Автоматическое скрытие через 3 секунды

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const classes = `notification ${type} ${isVisible ? "enter" : "exit"}`;

  return (
    <div className={classes}>
      <p>{message}</p>
      <button onClick={handleClose}>&times;</button>
    </div>
  );
};

export default SystemMessage;
