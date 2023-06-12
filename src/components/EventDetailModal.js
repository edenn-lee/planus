import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import './EventDetailModal.css';
import axios from 'axios';

const EventDetailModal = ({ showEditEvent, show, event, onClose, onDeleteClick, events, setEvents }) => {
  const [images, setImages] = useState(event.images);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  const token = localStorage.getItem('token');


  const handleDeleteClick = () => {
    onDeleteClick(event);
  };

  const handleImageUpdate = async (event, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      console.log("이미지 patch");
      const response = await axios.patch(`http://13.209.48.48:8080/api/schedules/image/${event.id}`, formData, {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
        },
      });
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentsSubmit = () => {
    if(event.groupId){
      console.log("rf이벤트");
      axios
      .post(
        `http://13.209.48.48:8080/comments`,
        {
          text: text,
          groupScheduleId: event.id,
        },
        {
          headers: {
            'Authorization': 'Bearer ' + token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        handleComments();
        setText('');
      })
      .catch((error) => console.log(error));
   
    }
    else{
      console.log("이벤트");
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
        handleComments();
        setText('');
      })
      .catch((error) => console.log(error));
    }
  };

  const handleComments = () => {
    if(event.groupId){
      axios
      .get(`http://13.209.48.48:8080/comments/groupSchedule/${event.id}`, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      })
      .then((response) => {
        console.log(response);
        setComments(response.data);
      })
      .catch((error) => console.log(error));
    }
    else{
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
    }
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
        {images && images.length > 0 ? (
          images.map((imageData, index) => (
            <img
              key={index}
              className='imageData'
              src={`data:image/jpeg;base64,${imageData.imageData}`}
              alt="Decoded Image"
            />
          ))
        ) : (
          <p></p>
        )}
          {event.content && <p>{event.content}</p>}
          <p>{new Date(event.start).toLocaleString()}</p>
          <p style={{fontSize:"12px", color:"blue"}}>{event.alarm && '알람 시간 : '+new Date(event.alarmDateTime[0], event.alarmDateTime[1] - 1, event.alarmDateTime[2], event.alarmDateTime[3], event.alarmDateTime[4]).toLocaleString()}</p>
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
