import React, { useState, useEffect, useRef } from "react";

const SeminarModal = ({ seminar, isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState(seminar?.title || "");
  const [description, setDescription] = useState(seminar?.description || "");
  const [date, setDate] = useState(seminar?.date || "");
  const [time, setTime] = useState(seminar?.time || "");
  const [photo, setPhoto] = useState(seminar?.photo || "");
  const modalRef = useRef(null);

  useEffect(() => {
    if (seminar) {
      setTitle(seminar.title || "");
      setDescription(seminar.description || "");
      setDate(seminar.date || "");
      setTime(seminar.time || "");
      setPhoto(seminar.photo || "");
    } else {
      setTitle("");
      setDescription("");
      setDate("");
      setTime("");
      setPhoto("");
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
    onSubmit({ id: seminar?.id, title, description, date, time, photo });
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
          <div>
            <label htmlFor="time">Время:</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="photo">Фото:</label>
            <input
              type="url"
              id="photo"
              value={photo}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button type="submit">Сохранить</button>
        </form>
      </div>
    </div>
  );
};

export default SeminarModal;
