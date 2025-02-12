import React from "react";

const SeminarItem = ({ seminar, onDelete, onEdit }) => {
  return (
    <li>
      {seminar.title} - {seminar.date}
      <div className="actions">
        <button onClick={() => onEdit(seminar)}>Редактировать</button>
        <button onClick={() => onDelete(seminar.id)}>Удалить</button>
      </div>
    </li>
  );
};

export default SeminarItem;
