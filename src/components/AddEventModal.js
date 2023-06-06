import React, { useState } from "react";
import Modal from "react-modal";
import "./AddEventModal.css";

function AddEventModal({ onAddEventSubmit, onClose, isOpen, groups}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [shared, setShared] = useState("");
  const [allDay, setAllDay] = useState(false);
  const [groupId, setGroupId] = useState(null);


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
      groupId, // 선택된 그룹의 id 값을 전달
    });

    setTitle("");
    setContent("");
    setStartDateTime("");
    setEndDateTime("");
    setShared("");
    setAllDay(false);

    onClose();
  };

  return (
    <Modal className={"add-modal"} isOpen={isOpen} onRequestClose={onClose}>
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
          onChange={(e) => setContent(e.target.value)}
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

          <div>
            <label htmlFor="group">그룹 선택: </label>
            <select
              id="group"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
            >
              <option value="">그룹</option>
              {groups.map(group => (
              <option key={group.id} value={group.id}>{group.name}</option>
            ))}
            </select>
          </div>
        

        <button type="submit">추가</button>
        <button type="button" onClick={onClose}>
          취소
        </button>
      </form>
    </Modal>
  );
}

export default AddEventModal;
