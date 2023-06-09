import { Modal, Button, ModalBody } from 'react-bootstrap';
import { useState ,useEffect} from 'react';
import './EventDetailModal.css';
import axios from 'axios';
import EditEventModal from './EditEventModal';

const EventDetailModal = ({groups, show, event, onClose, onEditClick, onDeleteClick, events, setEvents }) => {
  const [images, setImages] = useState(event.images);
  const token = localStorage.getItem('token');
  const [showEditEventModal, setShowEditEventModal] = useState(false);

  const handleEditClick = () => {
    setShowEditEventModal(true);
    console.log(showEditEventModal);
  };

  useEffect(()=>{
    console.log("EditEventModal");
    console.log(groups)
},[groups])


  const handleDeleteClick = () => {
    onDeleteClick(event);
  };

  const handleImageUpdate = async (event, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await axios.patch(`http://13.209.48.48:8080/api/schedules/image/${event.id}`, formData, {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
        },
      });

      const updatedEvent = response.data;
      setImages(updatedEvent.images);
      const updatedEvents = events.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt));
      setEvents(updatedEvents);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditEvent = (updatedEvent) => {
    onEditClick(updatedEvent);
    setShowEditEventModal(false);
  };

  return (
    <>
      <Modal show={show} onHide={onClose} className="event-detail-modal">
        <Modal.Header>
          <Modal.Title>{event.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {images && <img src={`data:image/jpeg;base64,${images}`} alt={event.title} />}
          {event.content && <p>{event.content}</p>}
          <p>{event.start.toLocaleString()}</p>
          <input type="file" onChange={(e) => handleImageUpdate(event, e.target.files[0])} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClick}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleDeleteClick}>
            Delete
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {showEditEventModal && (
        <EditEventModal
          show={showEditEventModal}
          event={event}
          onClose={() => setShowEditEventModal(false)}
          onEditClick={handleEditEvent}
          groups={groups}
        />
      )}
    </>
  );
};

export default EventDetailModal;
