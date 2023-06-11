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

  const { Buffer } = require('buffer');
  

  const handleDeleteClick = () => {
    onDeleteClick(event);
  };
  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      
    });
  };
  const handleImageUpdate = async (event, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await axios.patch(
      `http://13.209.48.48:8080/api/schedules/image/${event.id}`,
      formData,
      {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
        console.log(response);
    const updatedEvent = response.data;

    const ContentType = "image/jpeg";

    const buffer = Buffer.from(updatedEvent.images, 'base64');
    const byteArray = new Uint8Array(buffer);
    const blob = new Blob([byteArray], { type: ContentType });

    const base64Image = await convertBlobToBase64(blob);
    setImages(base64Image);

   console.log(updatedEvent.images);
   console.log(buffer);
    console.log(blob);
    console.log(byteArray);
    console.log(updatedEvent.ContentType);
    console.log(base64Image);

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
        handleComments();
        setText('');
      })
      .catch((error) => console.log(error));
  };

  useEffect(()=>{
    console.log(comments);
  },[comments])

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
    handleComments(event);
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
          {images && <img src={`data:image/jpeg;base64,${images}`} alt="No Images" />}
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
              <button type="button" onClick={()=>handleCommentsSubmit(event)}>댓글 작성</button>
            </form>
            {/* {groups.map((group) => (
                  <li style={{ fontSize: '14px' }} key={group.name}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedGroup.some((selected) => selected.id === group.id)}
                        onChange={(event) => handleGroupCheckboxChange(event, group)}
                      />
                      {group.name}
                    </label>

                    <KakaoShare isButtonDisabled={buttonDisabled}  onShare={{handleShare}}/>
             

                    {showEditGroup && (
                      <>
                        <button className="delete-button" onClick={() => checkDeleteGroupSubmit(group)}>
                          삭제
                        </button>
                      </>
                    )}
                  </li>
                ))} */}
            
              {/* {comments.map((comment) => (
                <div className="comment" key={comment}>
                  <p className="content">{comment.text}</p>
                </div>
              ))}
               */}
            
              

          
          </div>
        </Modal.Footer>
          
      </Modal>

      
    </>
  );
};

export default EventDetailModal;
