import React, { useState, useEffect, useRef } from "react";

const SeminarModal = ({ seminar, isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState(seminar?.title || "");
  const [description, setDescription] = useState(seminar?.description || "");
  const [date, setDate] = useState(seminar?.date || "");
  const modalRef = useRef(null);

  useEffect(() => {
    if (seminar) {
      setTitle(seminar.title || "");
      setDescription(seminar.description || "");
      setDate(seminar.date || "");
    } else {
      setTitle("");
      setDescription("");
      setDate("");
    }
  }, [seminar]);

  useEffect(() => {
    if (isOpen) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: seminar?.id, title, description, date });
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal" ref={modalRef} tabIndex="0">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{seminar ? "Редактировать Семинар" : "Добавить Семинар"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Заголовок:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Описание:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="date">Дата:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <button type="submit">Сохранить</button>
        </form>
      </div>
    </div>
  );
};

export default SeminarModal;
