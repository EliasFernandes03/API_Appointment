import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando o Bootstrap CSS

const AppointmentList = () => {
  const [appointment, setAppointment] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { id } = useParams(); 

  // Função para buscar os detalhes do compromisso
  const fetchAppointment = async () => {
    try {
      const response = await fetch(`http://localhost:3300/api/get-appointment/${id}`);
      if (response.ok) {
        const data = await response.json();
        setAppointment(data.appointment);
        setErrorMessage(null); // Limpa a mensagem de erro se a requisição for bem-sucedida
      } else if (response.status === 404) {
        setAppointment(null);
        setErrorMessage('O item não foi encontrado.'); // Define a mensagem de erro se o item não for encontrado
      }
    } catch (error) {
      console.error('Erro ao buscar compromisso:', error);
      setErrorMessage('Ocorreu um erro ao buscar o compromisso.'); // Define a mensagem de erro em caso de erro na requisição
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, [id]); 

  // Função para deletar o compromisso
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3300/api/delete-appointment/${id}`, {
        method: 'PUT'
      });

      if (response.ok) {
        console.log('Compromisso deletado com sucesso.');
        fetchAppointment();
      } else if (response.status === 404) {
        console.error('O item não foi encontrado.');
        setErrorMessage('O item não foi encontrado.'); 
      } else {
        console.error('Erro ao deletar compromisso:', response.statusText);
        setErrorMessage('Ocorreu um erro ao deletar o compromisso.'); 
      }
    } catch (error) {
      console.error('Erro ao deletar compromisso:', error);
      setErrorMessage('Ocorreu um erro ao deletar o compromisso.'); 
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="my-4">Detalhes do Compromisso</h1>
        <div className="card">
          <div className="card-body">
            {errorMessage ? (
              <p className="text-danger">{errorMessage}</p>
            ) : (
              <>
                {appointment ? (
                  <>
                    <p className="card-text">Dia: {appointment.dia}</p>
                    <p className="card-text">Horário: {appointment.horario}</p>
                    <p className="card-text">Cliente ID: {appointment.ClientId}</p>
                    <p className="card-text">Deletado: {appointment.deleted ? 'Sim' : 'Não'}</p>
                    <button className="btn btn-danger mr-2" onClick={handleDelete}>Deletar</button>
                  </>
                ) : (
                  <p className="text-danger">O item não foi encontrado.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentList;
