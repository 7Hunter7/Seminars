const API_URL = "/api/seminars";

// Получение всех семинаров
export const getSeminars = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении семинаров:", error);
    throw error;
  }
};

// Удаление семинара
export const deleteSeminar = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};

// Редактирование семинара
export const updateSeminar = async (id, seminarData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT", // или PATCH (в зависимости от требований API)
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(seminarData),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Создание семинара
export const createSeminar = async (seminarData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(seminarData),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
