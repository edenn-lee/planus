import  {React, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import AddEventModal from './AddEventModal';
import EventDetailModal from './EventDetailModal.js';
import axios from 'axios';
import NotificationButton from './NotificationButton';
import Notification from './Notification';


function MyCalendar({ selectedGroup ,Groups,Personal}) {

  const API_CALENDAR = 'http://13.209.48.48:8080/api/schedules';
  const API_USER = 'http://13.209.48.48:8080/api/schedules/user'

  const [events, setEvents] = useState([]);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetailModal, setShowEventDetailModal] = useState(false);
  
  const [isAccepted, setisAccepted] = useState(false);

  const token = localStorage.getItem('token');

  const handleAddEventSubmit = (data) => {
    if(data.shared) {
      console.log("단일공유");
      axios.post(`http://13.209.48.48:8080/api/schedules/shared?sharedWithIds=${data.shared}`, data, {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      })
      .then(response => {
        
        const newEvent = {
          ...data,
          id: response.data.id.toString(),
          start: new Date(data.startDateTime),
          end: new Date(data.endDateTime),
          content: data.content
        };
        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        setShowAddEventModal(false);
        console.log(events);
      })
      
      .catch(error => {
        console.error(error);
      });
    }
    else if(data.groupId){
      console.log("그룹공유");
        axios.post(`http://13.209.48.48:8080//api/groups/${data.groupId}/schedules`, {

          title: data.title,
          startDateTime: data.startDateTime,
          endDateTime:data.endDateTime
        }, {
          headers: {
            'Authorization': 'Bearer ' + token,
          }
        })
        .then(response => {
          eventsUpdate()
          console.log(events);
        })
        .catch(error => {
          console.error(error);
        });
    }

    else {
      console.log("개인일정");
      axios.post(API_CALENDAR, data, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(response => {
        console.log(data.shared);
        const newEvent = {
          ...data,
          id: response.data.id.toString(),
          start: new Date(data.startDateTime),
          end: new Date(data.endDateTime),
          content: data.content
        };
        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        
        setShowAddEventModal(false);

        console.log(events)
        
      })
      .catch(error => {
        console.error(error);
      });
    }
}

  const eventsUpdate = () => {
    axios.get(API_USER,{
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    })
    .then(response => {
      const getEvents = response.data.map(event => ({
        ...event,
        id: event.id.toString(),
        // start: event.startDateTime,
        start: new Date(event.startDateTime[0], event.startDateTime[1] - 1, event.startDateTime[2], event.startDateTime[3], event.startDateTime[4]),
        // end: event.endDateTime,
        end: new Date(event.endDateTime[0], event.endDateTime[1] - 1, event.endDateTime[2], event.endDateTime[3], event.endDateTime[4]),
        title: event.title,
        content: event.content,
      }));
      
      setEvents(getEvents);

    })
    .catch(error => console.log(error));
  }

  useEffect(() => {
      eventsUpdate();
  }, []);

useEffect(() => {
  // console.log(Personal);
  if(!Personal)
    eventsUpdate();
  else setEvents([]);
  // console.log(events);
}, [Personal]);

  const handleEventClick = (clickInfo) => {
    const eventId = clickInfo.event.id;
    const event = events.find(event => event.id === eventId);
  
    if (!event) {
      console.log("Could not find event with id", eventId);
      return;
    }
    setSelectedEvent(event);
    setShowEventDetailModal(true);
  };
  

const handleEditClick = (event) => {
  // Edit 버튼을 클릭한 이벤트를 API로 수정 요청하는 코드 작성 
  axios.put(`${API_CALENDAR}/${event.id}`, event, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then(response => {
    // 수정한 이벤트 데이터로 이벤트 목록 상태 업데이트 
    setEvents(prevState => {
      const index = prevState.findIndex(e => e.id === event.id);
      prevState[index] = event;
      return [...prevState];
    });
    // saveEventsToLocalStorage([...events]); // 로컬 스토리지에 저장
    setSelectedEvent(event);
  })
  .catch(error => {
    console.error(error);
  });
};

const handleDeleteClick = (event) => {
  // Delete 버튼을 클릭한 이벤트를 API로 삭제 요청하는 코드 작성 
  axios.delete(`${API_CALENDAR}/${event.id}`, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then(response => {
    // 삭제한 이벤트를 제외한 이벤트 목록으로 상태 업데이트 
    const newEvents = events.filter(e => e.id !== event.id);
    setEvents(newEvents);
    // saveEventsToLocalStorage(newEvents); // 로컬 스토리지에 저장
    setSelectedEvent(null);
    setShowEventDetailModal(false);
  })
  .catch(error => {
    console.error(error);
  });
};

  
  const calendarOptions = {
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'addEventButton',
        },
    
        customButtons: {
          addEventButton: {
            text: '일정 추가',
            click: () => setShowAddEventModal(true),
          },
        },
    
        titleFormat: {
          month: 'long',
        },
    
        eventClick: handleEventClick,
        events: events,
      };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        {...calendarOptions}
        style={{ height: '100%', width: '100%' }}
      />

      {showAddEventModal && (
        <AddEventModal
          onAddEventSubmit={handleAddEventSubmit}
          onClose={() => setShowAddEventModal(false)}
          isOpen={showAddEventModal}
          groups={Groups}
        />
      )}

      {showEventDetailModal && selectedEvent && (
        <EventDetailModal
        event={selectedEvent}
        onClose={() => setShowEventDetailModal(false)}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        show={showEventDetailModal}
        events={events}
        setEvents={setEvents}
      />
      )}
    </>
  );
}

export default MyCalendar;