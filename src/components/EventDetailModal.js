import { Modal, Button, ModalBody } from 'react-bootstrap';
import { useState ,useEffect} from 'react';
import './EventDetailModal.css';
import axios from 'axios';
import EditEventModal from './EditEventModal';
// import Modal from "react-modal";

const EventDetailModal = ({showEditEvent, show, event, onClose, onDeleteClick, events, setEvents }) => {
  const [images, setImages] = useState(event.images);
  const token = localStorage.getItem('token');
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [ScheduleId, setScheduleID] = useState('');



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
  
  const handleCommntsSubmit = (data) => {
    axios.get(`http://13.209.48.48:8080/comments`,data, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    })
    .then(response => {
      console.log(response);
      const newComments = {
        ScheduleId : response.data.ScheduleId,
        text : response.data.text
      }
      setComments((prevComments) => [...prevComments, ...newComments]);
      console.log(response);
    })
    .catch(error => console.log(error));
  }

  const handleCommnts = (event) => {
    axios.get(`http://13.209.48.48:8080/comments/schedule/${event.id}`,{
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    })
    .then(response => {
      console.log(response);
      const Comments = {
        ScheduleId : response.data.ScheduleId,
        text : response.data.text
      }|| [];
      setComments((prevComments) => [...prevComments, ...Comments]);
      console.log(response);
    })
    .catch(error => console.log(error));
  }

  useEffect(() => {
    handleCommnts(event);
  }, [])

  return (
    <>
      <Modal show={show}
      onHide={onClose}
      className="event-detail-modal"
      >
        <Modal.Header>
          <Modal.Title>{event.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {images && <img src={`data:image/jpeg;base64,${images}`} alt="이미지가업다" />}
          {event.content && <p>{event.content}</p>}
          <p>{event.start.toLocaleString()}</p>
          <input type="file" onChange={(e) => handleImageUpdate(event, e.target.files[0])} />
          
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{onClose(); showEditEvent(); }}>
            수정
          </Button>
          <Button variant="danger" onClick={handleDeleteClick}>
            삭제
          </Button>
          <Button variant="secondary" onClick={onClose}>
            취소
          </Button>
          <div className="comments-section">
            <h3>댓글</h3>
            <div className="comment">
              <span className="author">John Doe</span>
              <p className="content">첫 번째 댓글입니다.</p>
              <span className="comment-date">2023-06-09 14:30</span>
            </div>
            <div className="comment">
              <span className="author">Jane Smith</span>
              <p className="content">두 번째 댓글입니다.</p>
              <span className="comment-date">2023-06-09 15:15</span>
            </div>
            <div className="comment-divider"></div>
            <form className="comment-form">
              <textarea placeholder="댓글을 입력하세요"></textarea>
              {/* <button type="submit" onClick={()=>handleCommntsSubmit(data)}>댓글 작성</button> */}
            </form>
            
            <div className="comment">
              {comments.map((comment) => (
              <p className="content">{comment.text}</p>
              ))}
              
            </div>
              

          
          </div>
        </Modal.Footer>
          
      </Modal>

      
    </>
  );
};

export default EventDetailModal;
