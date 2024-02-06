import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando o Bootstrap CSS
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AppointmentList = () => {
  const [appointment, setAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedAppointment, setUpdatedAppointment] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const { id } = useParams(); 
  const fetchAppointment = async () => {
    try {
      const response = await fetch(`http://localhost:3300/api/get-appointment/${id}`);
      if (response.ok) {
        const data = await response.json();
        setAppointment(data.appointment);
        setUpdatedAppointment(data.appointment); 
        setErrorMessage(null); 
      } else if (response.status === 404) {
        setAppointment(null);
        setErrorMessage('O item não foi encontrado.'); 
      }
    } catch (error) {
      console.error('Erro ao buscar compromisso:', error);
      setErrorMessage('Ocorreu um erro ao buscar o compromisso.'); 
    }
  };


  useEffect(() => {

    fetchAppointment();
  }, [id]); 

  // Função para abrir o modal de edição
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Função para fechar o modal de edição
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Função para atualizar os campos do compromisso
  const handleUpdateAppointment = async () => {
    try {
      const response = await fetch(`http://localhost:3300/api/update-appointment/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedAppointment)
      });

      if (response.ok) {
        console.log('Compromisso atualizado com sucesso.');
        handleCloseModal(); // Fechar o modal após a atualização bem-sucedida
        // Recarregar os detalhes do compromisso após a atualização bem-sucedida
        const updatedResponse = await fetch(`http://localhost:3300/api/get-appointment/${id}`);
        if (updatedResponse.ok) {
          const data = await updatedResponse.json();
          setAppointment(data.appointment);
        }
      } else {
        console.error('Erro ao atualizar compromisso:', response.statusText);
        setErrorMessage('Ocorreu um erro ao atualizar o compromisso.'); 
      }
    } catch (error) {
      console.error('Erro ao atualizar compromisso:', error);
      setErrorMessage('Ocorreu um erro ao atualizar o compromisso.'); 
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAppointment({ ...updatedAppointment, [name]: value });
  };
  
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3300/api/delete-appointment/${id}`, {
        method: 'PUT'
      });

      if (response.ok) {
        console.log('Compromisso deletado com sucesso.');
        fetchAppointment();
      } else if (response.status === 404) {
        console.error('O item não foi deletado.');
        setErrorMessage('O item não foi deletado.'); 
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
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    <Button variant="primary" onClick={handleOpenModal}>Atualizar</Button>
                    <Modal show={showModal} onHide={handleCloseModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Modificar Compromisso</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form>
                          <div className="form-group">
                            <label htmlFor="dia">Dia</label>
                            <input type="text" className="form-control" id="dia" name="dia" value={updatedAppointment.dia || ''} onChange={handleInputChange} />
                          </div>
                          <div className="form-group">
                            <label htmlFor="horario">Horário</label>
                            <input type="text" className="form-control" id="horario" name="horario" value={updatedAppointment.horario || ''} onChange={handleInputChange} />
                          </div>
                        </form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                          Fechar
                        </Button>
                        <Button variant="primary" onClick={handleUpdateAppointment}>
                          Salvar Mudanças
                        </Button>
                      </Modal.Footer>
                    </Modal>
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
