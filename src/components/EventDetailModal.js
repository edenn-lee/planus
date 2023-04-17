import { Modal, Button } from 'react-bootstrap';

const EventDetailModal = ({ isOpen, event, onClose }) => {

    return (
      <Modal show={isOpen} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{event.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{event.description}</p>
          <p>{event.start.toLocaleString()}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  
  export default EventDetailModal;