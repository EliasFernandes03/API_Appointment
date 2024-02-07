import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dia() {
  const [appointments, setAppointments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const API_BASE_URL = 'http://localhost:3300/api';
  const TOKEN = '123bolinha4';

  useEffect(() => {
    // Função para buscar os compromissos do Dia
    const fetchAppointments = async (data) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/appointments-day/${data}`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`
          }
        }); 
        setAppointments(response.data.appointment); // Ajuste para acessar response.data.appointment
        alert('deu bom')
      } catch (error) {
        setErrorMessage('Erro ao carregar os compromissos.');
      }
    };

    // Defina a variável data antes de chamar fetchAppointments
    const data = '2024-12-01'; // Substitua '2024-12-01' pela data desejada

    fetchAppointments(data);
  }, []); // Chama uma vez na montagem do componente

  return (
    <div className="container">
      <h1 className="my-4">Detalhes do Compromisso</h1>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {appointments.map(appointment => (
        <div className="card my-3" key={appointment.id}>
          <div className="card-body">
            <p className="card-text">Dia: {appointment.dia}</p>
            <p className="card-text">Horário: {appointment.horario}</p>
            <p className="card-text">Cliente ID: {appointment.ClientId}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dia;
