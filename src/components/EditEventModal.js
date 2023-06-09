import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./EditEventModal.css";

function EditEventModal({ hide,event, onClose, show, groups ,handleEditSubmit}) {
  const [title, setTitle] = useState(event.title);
  const [content, setContent] = useState(event.content);
  const [startDateTime, setStartDateTime] = useState(event.startDateTime);
  const [endDateTime, setEndDateTime] = useState(event.endDateTime);
  const [shared, setShared] = useState(event.shared);
  const [allDay, setAllDay] = useState(event.allDay);
  const [groupId, setGroupId] = useState(event.groupId);


  useEffect(()=>{
    console.log("EditEventModal");
    console.log(groups)
},[])
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("일정 내용을 입력해주세요.");
      return;
    }

    const updatedEvent = {
      id: event.id,
      title,
      content,
      startDateTime,
      endDateTime,
      allDay,
      shared,
      groupId,
    };

    handleEditSubmit(updatedEvent);
    
    onClose();
  };

  return (
    <Modal className="edit-modal" isOpen={show} onRequestClose={onClose}>
      <form className="edit-events-modal" onSubmit={handleSubmit}>
        <h2 style={{textAlign:"center"}}>일정 수정</h2>
        <label htmlFor="title">일정 제목:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="content">일정 내용:</label>
        <textarea
          style={{ height: "4rem" }}
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <label htmlFor="startDateTime">시작 시간:</label>
        <input
          type="datetime-local"
          id="startDateTime"
          value={startDateTime}
          onChange={(e) => setStartDateTime(e.target.value)}
        />

        <label htmlFor="endDateTime">종료 시간:</label>
        <input
          type="datetime-local"
          id="endDateTime"
          value={endDateTime}
          onChange={(e) => setEndDateTime(e.target.value)}
        />

        <label htmlFor="shared">공유 대상:</label>
        <input
          type="text"
          id="shared"
          value={shared}
          onChange={(e) => setShared(e.target.value)}
        />

        <label htmlFor="all-day">
          <input
            type="checkbox"
            id="all-day"
            checked={allDay}
            onChange={(e) => setAllDay(e.target.checked)}
          />
          하루 종일
        </label>

        <div>
          <label htmlFor="group">그룹 선택:</label>
          <select
            id="group"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
          >
            <option value="">그룹</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" onClick={()=>{handleSubmit()}}>수정</button>
        <button type="button" onClick={onClose}>
          취소
        </button>
      </form>
    </Modal>
  );
}

export default EditEventModal;
