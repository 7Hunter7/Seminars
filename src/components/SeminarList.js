import React from "react";
import SeminarItem from "./SeminarItem";
import styles from "@/components/SeminarList.module.css";

const SeminarList = ({ seminars, onDelete, onEdit }) => {
  return (
    <ul className={styles.list}>
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
