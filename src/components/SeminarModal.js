import React, { useState, useEffect, useRef } from "react";

const SeminarModal = ({ seminar, isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState(seminar?.title || "");
  const [description, setDescription] = useState(seminar?.description || "");
  const [date, setDate] = useState(seminar?.date || "");
  const [time, setTime] = useState(seminar?.time || "");
  const [photo, setPhoto] = useState(seminar?.photo || "");
  const modalRef = useRef(null);

  // Функция для преобразования формата даты из dd.MM.yyyy в yyyy-MM-dd
  function formatDate(dateString) {
    if (!dateString) return ""; // Обработка пустой даты
    const parts = dateString.split(".");
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return ""; // Если формат не соответствует
  }

  useEffect(() => {
    if (seminar) {
      setTitle(seminar.title || "");
      setDescription(seminar.description || "");
      setDate(formatDate(seminar.date) || "");
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
    // Преобразование даты обратно в формат dd.MM.yyyy перед отправкой данных
    const formattedDate = date
      ? `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(0, 4)}`
      : "";
    onSubmit({
      id: seminar?.id,
      title,
      description,
      date: formattedDate,
      time,
      photo,
    });
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal" ref={modalRef} tabIndex="0">
      <div className="modal__content">
        <span className="modal__close" onClick={onClose}>
          &times;
        </span>
        <h2>{seminar ? "Редактировать Семинар" : "Добавить Семинар"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal__form">
            <label htmlFor="title" className="modal__form_label">
              Заголовок:
            </label>
            <input
              type="text"
              id="title"
              className="modal__form_input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="modal__form">
            <label htmlFor="description" className="modal__form_label">
              Описание:
            </label>
            <textarea
              id="description"
              className="modal__form_textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="modal__form">
            <label htmlFor="date" className="modal__form_label">
              Дата:
            </label>
            <input
              type="date"
              id="date"
              className="modal__form_input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="modal__form">
            <label htmlFor="time" className="modal__form_label">
              Время:
            </label>
            <input
              type="time"
              id="time"
              className="modal__form_input"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="modal__form">
            <label htmlFor="photo" className="modal__form_label">
              Фото:
            </label>
            <input
              type="text"
              id="photo"
              className="modal__form_input"
              value={photo}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button type="submit" className="modal__submitButton">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};

export default SeminarModal;
