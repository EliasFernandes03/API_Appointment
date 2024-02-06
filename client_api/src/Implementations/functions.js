// api.js

const API_BASE_URL = 'http://localhost:3300/api';

export const getAppointment = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/get-appointment/${id}`);
    if (response.ok) {
      const data = await response.json();
      return data.appointment;
    } else if (response.status === 404) {
      return null; 
    } else {
      throw new Error('Erro ao buscar compromisso: ' + response.statusText);
    }
  } catch (error) {
    throw new Error('Erro ao buscar compromisso: ' + error.message);
  }
};

export const deleteAppointment = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/delete-appointment/${id}`, {
      method: 'PUT'
    });

    if (response.ok) {
      console.log('Compromisso deletado com sucesso.');
    } else if (response.status === 404) {
      throw new Error('O item não foi encontrado.');
    } else {
      throw new Error('Erro ao deletar compromisso: ' + response.statusText);
    }
  } catch (error) {
    throw new Error('Erro ao deletar compromisso: ' + error.message);
  }
};

export const updateAppointment = async (id, updatedAppointment) => {
  try {
    const response = await fetch(`${API_BASE_URL}/update-appointment/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedAppointment)
    });

    if (response.ok) {
      console.log('Compromisso atualizado com sucesso.');
    } else {
      throw new Error('Erro ao atualizar compromisso: ' + response.statusText);
    }
  } catch (error) {
    throw new Error('Erro ao atualizar compromisso: ' + error.message);
  }
};
