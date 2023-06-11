import { Modal, Button, ModalBody } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import './EventDetailModal.css';
import axios from 'axios';

const EventDetailModal = ({ showEditEvent, show, event, onClose, onDeleteClick, events, setEvents }) => {
  const [images, setImages] = useState(event.images);
  const token = localStorage.getItem('token');
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  const handleDeleteClick = () => {
    onDeleteClick(event);
  };
  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
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
      const imageResponse = await axios.get(updatedEvent.images, { responseType: 'arraybuffer' });
      const byteArray = new Uint8Array(imageResponse.data);
      let binaryData = '';
      byteArray.forEach((byte) => {
        binaryData += String.fromCharCode(byte);
      });
      const base64Image = btoa(binaryData);
      setImages(`data:${imageResponse.headers['content-type']};base64,${base64Image}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentsSubmit = () => {
    axios
      .post(
        `http://13.209.48.48:8080/comments`,
        {
          text: text,
          scheduleId: event.id,
        },
        {
          headers: {
            'Authorization': 'Bearer ' + token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        const newComment = {
          ScheduleId: response.data.ScheduleId,
          text: response.data.text,
        };
        setComments((prevComments) => [...prevComments, newComment]);
        setText('');
      })
      .catch((error) => console.log(error));
  };

  const handleComments = () => {
    axios
      .get(`http://13.209.48.48:8080/comments/schedule/${event.id}`, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      })
      .then((response) => {
        console.log(response);
        setComments(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleComments();
  }, []);

  return (
    <>
      <Modal show={show} onHide={onClose} className="event-detail-modal">
        <Modal.Header>
          <Modal.Title>{event.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {images && <img src={`${ImageData}`} alt="Not Images" />}
          {event.content && <p>{event.content}</p>}
          <p>{event.start.toLocaleString()}</p>
          <input type="file" onChange={(e) => handleImageUpdate(event, e.target.files[0])} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => { onClose(); showEditEvent(); }}>
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
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <span className="author">{comment.memberNickname}</span>
                <p className="content">{comment.text}</p>
                {/* <span className="comment-date">{comment.date}</span> */}
              </div>
            ))}
            <div className="comment-divider"></div>
            <form className="comment-form">
              <textarea
                placeholder="댓글을 입력하세요"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
              <button type="button" onClick={handleCommentsSubmit}>
                댓글 작성
              </button>
            </form>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EventDetailModal;
