import React, { useState, useEffect } from "react";
import SeminarList from "@/components/SeminarList";
import SeminarModal from "@/components/SeminarModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import SystemMessage from "@/components/SystemMessage";
import {
  getSeminars,
  deleteSeminar,
  updateSeminar,
  createSeminar,
} from "@/services/seminarService";
import "@/App.css";

function App() {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeminar, setSelectedSeminar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [seminarToDeleteId, setSeminarToDeleteId] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchSeminars();
  }, []);

  const fetchSeminars = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSeminars();
      setSeminars(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const handleEditSeminar = (seminar) => {
    setSelectedSeminar(seminar);
    setIsModalOpen(true);
  };

  const handleDeleteSeminar = (id) => {
    setSeminarToDeleteId(id);
    setIsConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    setIsConfirmationOpen(false);
    try {
      await deleteSeminar(seminarToDeleteId);
      setSeminars(
        seminars.filter((seminar) => seminar.id !== seminarToDeleteId)
      );
      setSeminarToDeleteId(null);
      showNotification("Семинар успешно удален!", "success");
    } catch (err) {
      setError(err.message);
      showNotification("Ошибка удаления семинара: " + err.message, "error");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSeminar(null);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationOpen(false);
    setSeminarToDeleteId(null);
  };

  const handleSeminarSubmit = async (seminarData) => {
    try {
      if (seminarData.id) {
        await updateSeminar(seminarData.id, seminarData);
        setSeminars(
          seminars.map((seminar) =>
            seminar.id === seminarData.id ? seminarData : seminar
          )
        );
        showNotification("Семинар успешно обновлен!", "success");
      } else {
        const newSeminar = await createSeminar(seminarData);
        setSeminars([...seminars, newSeminar]);
        showNotification("Новый семинар успешно добавлен!", "success");
      }

      closeModal();
      fetchSeminars();
    } catch (err) {
      setError(err.message);
      showNotification("Ошибка сохранения семинара: " + error.message, "error");
    }
  };

  const openNewSeminarModal = () => {
    setSelectedSeminar(null);
    setIsModalOpen(true);
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className="App">
      <h1>Список Семинаров</h1>
      <button onClick={openNewSeminarModal}>Добавить Семинар</button>
      <SeminarList
        seminars={seminars}
        onDelete={handleDeleteSeminar}
        onEdit={handleEditSeminar}
      />

      <SeminarModal
        isOpen={isModalOpen}
        onClose={closeModal}
        seminar={selectedSeminar}
        onSubmit={handleSeminarSubmit}
      />

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={closeConfirmationModal}
        onConfirm={confirmDelete}
        message="Вы уверены, что хотите удалить этот семинар?"
      />

      {notification && (
        <SystemMessage
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}
    </div>
  );
}

export default App;
