import React, { useState, useEffect } from "react";
import SeminarList from "@/components/SeminarList";
import SeminarModal from "@/components/SeminarModal";
import ConfirmationModal from "@/components/ConfirmationModal";
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
  const [isNewSeminarModalOpen, setIsNewSeminarModalOpen] = useState(false);

  useEffect(() => {
    fetchSeminars();
  }, []);

  const fetchSeminars = async () => {
    console.log("fetchSeminars called");
    setLoading(true);
    setError(null);
    try {
      const data = await getSeminars();
      setSeminars(data);
      console.log(seminars);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
    } catch (err) {
      setError(err.message);
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
      } else {
        const newSeminar = await createSeminar(seminarData);
        setSeminars([...seminars, newSeminar]);
      }

      closeModal();
      setIsNewSeminarModalOpen(false);
      fetchSeminars();
    } catch (err) {
      setError(err.message);
    }
  };

  const openNewSeminarModal = () => {
    setSelectedSeminar(null);
    setIsNewSeminarModalOpen(true);
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
        isOpen={isModalOpen || isNewSeminarModalOpen}
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
    </div>
  );
}

export default App;
