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
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="modal__form">
            <label htmlFor="photo" className="modal__form_label">
              Фото:
            </label>
            <input
              type="url"
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
