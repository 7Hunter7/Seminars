import React from "react";

const SeminarItem = ({ seminar, onDelete, onEdit }) => {
  return (
    <li>
      {seminar.title} - {seminar.date}
      <button onClick={() => onEdit(seminar)}>Редактировать</button>
      <button onClick={() => onDelete(seminar.id)}>Удалить</button>
    </li>
  );
};

export default SeminarItem;
