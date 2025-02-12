import React from "react";
import SeminarItem from "./SeminarItem";

const SeminarList = ({ seminars, onDelete, onEdit }) => {
  return (
    <ul>
      {seminars.map((seminar) => (
        <SeminarItem
          key={seminar.id}
          seminar={seminar}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

export default SeminarList;
