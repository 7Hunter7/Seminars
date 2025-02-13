import React from "react";
import styles from "@/components/SeminarItem.module.css";

const SeminarItem = ({ seminar, onDelete, onEdit }) => {
  return (
    <li className={styles.seminar}>
      <img
        className={styles.image}
        src={seminar.photo}
        alt="Seminar photo"
        width="750"
        height="730"
      />
      <div className={styles.content}>
        <h2 className={styles.title}>{seminar.title}</h2>
        <p className={styles.description}>{seminar.description}</p>
        <p className={styles.dateTime}>
          Начало: {seminar.date} в {seminar.time}
        </p>
        <div className={styles.actions}>
          <button onClick={() => onEdit(seminar)}>Редактировать</button>
          <button onClick={() => onDelete(seminar.id)}>Удалить</button>
        </div>
      </div>
    </li>
  );
};

export default SeminarItem;
