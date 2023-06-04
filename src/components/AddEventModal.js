import React, { useState } from "react";
import Modal from "react-modal";

function AddEventModal({ onAddEventSubmit, onClose, isOpen }) {
  const [title, setTitle] = useState("");
  const [content, setcontent] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [shared, setShared] = useState("");
  const [allDay, setAllDay] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("일정 내용을 입력해주세요.");
      return;
    }

    onAddEventSubmit({
      title,
      content,
      startDateTime,
      endDateTime,
      allDay,
      shared,
    });

    setTitle("");
    setcontent("");
    setStartDateTime("");
    setEndDateTime("");
    setShared("");
    setAllDay(false);

    onClose();
  };

  return (
    <Modal className={"modal"} isOpen={isOpen} onRequestClose={onClose}>
      <form className="add-events-modal" onSubmit={handleSubmit}>
        <label htmlFor="title">일정 제목 : </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="content">일정 내용 : </label>
        <textarea
          style={{ height: "4rem" }}
          id="content"
          value={content}
          onChange={(e) => setcontent(e.target.value)}
        ></textarea>

        <label htmlFor="startDateTime">시작 시간 : </label>
        <input
          type="datetime-local"
          id="startDateTime"
          value={startDateTime}
          onChange={(e) => setStartDateTime(e.target.value)}
        />

        <label htmlFor="endDateTime">종료 시간 : </label>
        <input
          type="datetime-local"
          id="endDateTime"
          value={endDateTime}
          onChange={(e) => setEndDateTime(e.target.value)}
        />

        <label htmlFor="shared">공유 대상 : </label>
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

        <button type="submit">추가</button>
        <button type="button" onClick={onClose}>
          취소
        </button>
      </form>
    </Modal>
  );
}

export default AddEventModal;
