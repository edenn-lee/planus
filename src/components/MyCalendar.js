import  {React, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import AddEventModal from './AddEventModal';
import EventDetailModal from './EventDetailModal.js';
import axios from 'axios';
import NotificationButton from './NotificationButton';
import Notification from './Notification';
import EditEventModal from './EditEventModal';


function MyCalendar({ selectedGroup ,Groups,Personal, events, setEvents}) {

  const API_CALENDAR = 'http://13.209.48.48:8080/api/schedules';
  const API_USER = 'http://13.209.48.48:8080/api/schedules/user'

  
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetailModal, setShowEventDetailModal] = useState(false);
  const [personalEvents, setPersonalEvents] = useState([]);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [editEvent, setEditEvent] = useState('');
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
      console.log(data.groupId);
        axios.post(`http://13.209.48.48:8080/api/groups/${data.groupId}/schedules`, {

          title: data.title,
          startDateTime: data.startDateTime,
          endDateTime: data.endDateTime
        }, {
          headers: {
            'Authorization': 'Bearer ' + token,
          }
        })
        .then(response => {
          handleSelectedGroupEvents()
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
    let getEvents=[];
    axios.get(API_USER,{
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    })
    .then(response => {
      // console.log(response);
      getEvents = response.data.map(event => ({
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
      setPersonalEvents(getEvents);
    })
    .catch(error => console.log(error));
    console.log('Events Update')
  }

  const setGroupEvents = () => {
    // setEvents(personalEvents);
    for (const group of selectedGroup) {
      axios.get(`http://13.209.48.48:8080/api/groups/${group.id}/schedules`,{
            headers: {
              'Authorization': 'Bearer ' + token,
            }
          })
          .then(response => {
            console.log(response);
              const Events = response.data.map(event => ({
              ...event,
              id: event.id.toString(),
              start: new Date(event.startDateTime[0], event.startDateTime[1] - 1, event.startDateTime[2], event.startDateTime[3], event.startDateTime[4]),
              end: new Date(event.endDateTime[0], event.endDateTime[1] - 1, event.endDateTime[2], event.endDateTime[3], event.endDateTime[4]),
              title: event.title,
              content: event.content,
              groupId:event.groupId
            }));
            setEvents((prevEvents) => [...prevEvents, ...Events]);
          })
          .catch(error => console.log(error));
    }
  }

  const handleSelectedGroupEvents = async () => {
    console.log(selectedGroup.length>0 & Personal === true);
    if(selectedGroup.length>0 & Personal === true){
      console.log("그룹&개인")
      setEvents(personalEvents);
      setGroupEvents();
    }
    else if(selectedGroup.length > 0 & Personal===false){
        setEvents([]);
        setGroupEvents();
      console.log('그룹일정변경');
    }
    else if(selectedGroup.length===0 & Personal===true) {
      console.log("개인일정");
      eventsUpdate();
    }
    else if(selectedGroup.length===0 & Personal===false){
      console.log("일정초기화");
      setEvents([]);
    }
  };

  useEffect(() => {
    // setEvents([]);
    eventsUpdate();
  }, []);

  useEffect(() => {
    handleSelectedGroupEvents();
  }, [selectedGroup,Personal]);

  // useEffect(() => {
  //   console.log("Personal Change")
  //   handleSelectedGroupEvents();
  // }, [Personal]);



  const handleEventClick = (clickInfo) => {
    const eventId = clickInfo.event.id;
    const event = events.find(event => event.id === eventId);
  
    if (!event) {
      console.log("Could not find event with id", eventId);
      return;
    }
    setSelectedEvent(event);
    setShowEventDetailModal(true);
    console.log(event);
  };
  

const handleEditClick = (data) => {
  if(data.shared) {
    console.log("단일공유");
    axios.patch(`http://13.209.48.48:8080/api/schedules/shared?sharedWithIds=${data.shared}`, data, {
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
    console.log(data.groupId);
      axios.patch(`http://13.209.48.48:8080/api/groups/${data.groupId}/schedules`, {

        title: data.title,
        startDateTime: data.startDateTime,
        endDateTime: data.endDateTime
      }, {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      })
      .then(response => {
        handleSelectedGroupEvents()
        console.log(events);
      })
      .catch(error => {
        console.error(error);
      });
  }

  else {
    console.log("개인일정");
    axios.patch(API_CALENDAR, data, {
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
};

const handleEditEvent=()=>{
  setShowEditEventModal(true)
}


const handleDeleteClick = (event) => {
  if(event.groupId){
    axios.delete(`http://13.209.48.48:8080/api/groups/${event.groupId}/schedules/${event.id}`,{
      headers: {
          'Authorization': 'Bearer ' + token,
        }
    })
    .then(response => {
      const newEvents = events.filter(e => e.id !== event.id);
      setEvents(newEvents);
      
      setSelectedEvent(null);
      setShowEventDetailModal(false);
    })
    .catch(error => console.log(error));
  }
  else{
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
  }
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
        groups={Groups}
        showEditEvent={handleEditEvent}
      />
      )}

      {showEditEventModal && (
            <EditEventModal
              show={showEditEventModal}
              event={selectedEvent}
              onClose={() => setShowEditEventModal(false)}
              groups={Groups}
              hide = {()=>setShowEventDetailModal(false)}
              handleEditSubmit={handleEditClick}
            />
          )}
    </>
  );
}

export default MyCalendar;