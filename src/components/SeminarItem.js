import React from "react";

const SeminarItem = ({ seminar, onDelete, onEdit }) => {
  return (
    <li className="seminar">
      <img
        className="seminar__image"
        src={seminar.photo}
        alt="Seminar photo"
        width="750"
        height="730"
      />
      <div className="seminar__content">
        <h2 className="seminar__title">{seminar.title}</h2>
        <p className="seminar__description">{seminar.description}</p>
        <p className="seminar__dateTime">
          Начало: {seminar.date} в {seminar.time}
        </p>
        <div className="seminar__actions">
          <button onClick={() => onEdit(seminar)}>Редактировать</button>
          <button onClick={() => onDelete(seminar.id)}>Удалить</button>
        </div>
      </div>
    </li>
  );
};

export default SeminarItem;
