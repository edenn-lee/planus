import React, { useState } from "react";
import Modal from "react-modal";

function AddEventModal({ onAddEventSubmit, onClose ,isOpen}) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [allDay, setAllDay] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    if (!title.trim()) {
      alert("일정 내용을 입력해주세요.");
      return;
    }

    onAddEventSubmit({ title, start, end, allDay });

    setTitle("");
    setStart("");
    setEnd("");
    setAllDay(false);

    onClose();
  };



  
return (
  <Modal className={'modal'} isOpen={isOpen} onRequestClose={onClose}>
    
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">일정 내용 : </label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="start">시작 시간 : </label>
      <input
        type="datetime-local"
        id="start"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />

      <label htmlFor="end">종료 시간 : </label>
      <input
        type="datetime-local"
        id="end"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
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

      <button type="submit">추가</button>
      <button type="button" onClick={onClose}>
        취소
      </button>
    </form>
  </Modal>
);
}

export default AddEventModal;