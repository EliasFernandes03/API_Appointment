import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { getAppointment, deleteAppointment, updateAppointment } from '../Implementations/functions';

const AppointmentList = () => {
  const [appointment, setAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedAppointment, setUpdatedAppointment] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const appointmentData = await getAppointment(id);
        setAppointment(appointmentData);
        setUpdatedAppointment(appointmentData);
        setErrorMessage(null); 
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchAppointmentData();
  }, [id]); 

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleUpdateAppointment = async () => {
    try {
      await updateAppointment(id, updatedAppointment);
      handleCloseModal(); 
  
      const appointmentData = await getAppointment(id);
      setAppointment(appointmentData);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAppointment({ ...updatedAppointment, [name]: value });
  };

  const handleDelete = async () => {
    try {
      await deleteAppointment(id);
      setAppointment(null);
    } catch (error) {
      setErrorMessage(error.message);
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
                    <button className="btn btn-primary mr-2" onClick={handleOpenModal}>Modificar</button>
                    <button className="btn btn-danger" onClick={handleDelete}>Deletar</button>
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
