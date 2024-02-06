import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Importe o hook useParams para extrair parâmetros da URL

const AppointmentList = () => {
  const [appointment, setAppointment] = useState(null);
  const { id } = useParams(); // Extrai o parâmetro 'id' da URL da rota

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await fetch(`http://localhost:3300/api/get-appointment/${id}`);
        const data = await response.json();
        setAppointment(data.appointment);
      } catch (error) {
        console.error('Erro ao buscar compromisso:', error);
      }
    };

    fetchAppointment();
  }, [id]); // Dependência 'id' para reexecutar o efeito quando o ID mudar

  return (
    <>
      <div>
        <h1>Detalhes do Compromisso</h1>
        {appointment ? (
          <div>
            <p>Dia: {appointment.dia}</p>
            <p>Horário: {appointment.horario}</p>
            <p>Cliente ID: {appointment.ClientId}</p>
            <p>Deletado: {appointment.deleted ? 'Sim' : 'Não'}</p>
          </div>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </>
  );
};

export default AppointmentList;
