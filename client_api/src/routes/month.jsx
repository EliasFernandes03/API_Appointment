import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Importe o hook useParams do react-router-dom

function Mes() {
  const [appointments, setAppointments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const API_BASE_URL = 'http://localhost:3300/api';
  const TOKEN = '123bolinha4';


  const { data } = useParams();

  useEffect(() => {
    const fetchAppointments = async (data) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/appointments-month/${data}`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`
          }
        }); 
        setAppointments(response.data.appointment || []); 
      } catch (error) {
        setErrorMessage('Erro ao carregar os compromissos.');
      }
    };
  
    fetchAppointments(data);
  }, [data]); 

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

export default Mes;
