import React, { useEffect, useState } from 'react';

const AppointmentList = () => {
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    // Função para buscar dados da API
    const fetchAppointment = async () => {
      try {
        const response = await fetch('http://localhost:3300/api/get-appointment/131ecdfe-ab15-45da-9b15-9c8ec60aaa0f'); // Substitua pela sua rota real
        const data = await response.json();
        setAppointment(data.appointment);
      } catch (error) {
        console.error('Erro ao buscar compromisso:', error);
      }
    };

    // Chama a função para buscar dados ao montar o componente
    fetchAppointment();
  }, []); // O segundo parâmetro [] indica que isso deve ser executado apenas uma vez no montagem do componente

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
