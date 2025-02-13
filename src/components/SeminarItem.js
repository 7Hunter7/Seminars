import React from "react";

const SeminarItem = ({ seminar, onDelete, onEdit }) => {
  return (
    <li className="seminar">
      <div className="seminar__content">
        <img className="image" src="{seminar.photo}" alt="Seminar photo" />
        <h2 className="title">{seminar.title}</h2>
        <p className="description">{seminar.description} </p>
        <div className="date">
          Начало в {seminar.time} часов {seminar.date}
        </div>
      </div>
      <div className="actions">
        <button onClick={() => onEdit(seminar)}>Редактировать</button>
        <button onClick={() => onDelete(seminar.id)}>Удалить</button>
      </div>
    </li>
  );
};

export default SeminarItem;
