import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

const EventDetailModal = ({ show, event, onClose, onEditClick, onDeleteClick, events, setEvents }) => {
  const [images, setImages] = useState(event.images);
  // const decodedImage = atob(event.images);
  const token = localStorage.getItem('token');

  const handleEditClick = () => {
    onEditClick(event);
  };

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

      // 업데이트된 event 객체의 imageSrc 필드를 갱신
      const updatedEvent = response.data;
      setImages(updatedEvent.images);
      console.log(event.images);
      // 업데이트된 event 객체로 state를 갱신
      const updatedEvents = events.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt));
      setEvents(updatedEvents);
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onClose} className="event-detail-modal">
      <Modal.Header closeButton>
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
  );
};

export default EventDetailModal;
