import  {React, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

import AddEventModal from './AddEventModal';
import EventDetailModal from './EventDetailModal.js';
import EditEventModal from './EditEventModal';
// import Alarm from './Alarm';


function MyCalendar({ selectedGroup ,Groups,Personal, events, setEvents,isAccepted, handleIsAccepted}) {

  const API_CALENDAR = 'http://13.209.48.48:8080/api/schedules';
  const API_USER = 'http://13.209.48.48:8080/api/schedules/user'

  
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetailModal, setShowEventDetailModal] = useState(false);
  const [personalEvents, setPersonalEvents] = useState([]);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
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
          content: data.content,
          alarm:data.alarm,
          alarm:data.alarmDateTime,
        };
        
        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        setShowAddEventModal(false);
        // console.log(events);
      })
      
      .catch(error => {
        console.error(error);
      });
    }
    else if(data.groupId){
      console.log("그룹공유");
      console.log(data.alarm);
      console.log(data.alarmDateTime);
        axios.post(`http://13.209.48.48:8080/api/groups/${data.groupId}/schedules`, {
          title: data.title,
          startDateTime: data.startDateTime,
          endDateTime: data.endDateTime,
          content:data.content,
          alarm:data.alarm,
          alarmDateTime:data.alarmDateTime,
        }, {
          headers: {
            'Authorization': 'Bearer ' + token,
          }
        })
        .then(response => {
          handleSelectedGroupEvents()
          console.log(response);
          console.log("ㅇㄴ;ㅣㅏㅓㄻ니;ㅇ럼;ㅣㄴ얼");
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
        // console.log(data.shared);
        const newEvent = {
          ...data,
          id: response.data.id.toString(),
          start: new Date(data.startDateTime),
          end: new Date(data.endDateTime),
          content: data.content,
          alarm:data.alarm,
          alarm:data.alarmDateTime,
        };
        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        
        setShowAddEventModal(false);

        // console.log(events)
        
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
      getEvents = response.data.map(event => ({
        ...event,
        id: event.id.toString(),
        start: new Date(event.startDateTime[0], event.startDateTime[1] - 1, event.startDateTime[2], event.startDateTime[3], event.startDateTime[4]),
        end: new Date(event.endDateTime[0], event.endDateTime[1] - 1, event.endDateTime[2], event.endDateTime[3], event.endDateTime[4]),
        title: event.title,
        content: event.content,
        alarm:event.alarm,
        alarm:event.alarmDateTime,
      }));
      console.log(response.data)
      setEvents(getEvents);
      setPersonalEvents(getEvents);
    })
    .catch(error => console.log(error));
    console.log('Events Update')
  }

  const setGroupEvents = () => {
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
            groupId:event.groupId,
            alarm:event.alarm,
            alarm:event.alarmDateTime,
          }));
            setEvents((prevEvents) => [...prevEvents, ...Events]);
            // console.log(response.data);
          })
          .catch(error => console.log(error));
    }
  }

  const handleSelectedGroupEvents = async () => {
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
 
    eventsUpdate();
  }, []);

 

  useEffect(() => {
    handleSelectedGroupEvents();
  }, [selectedGroup,Personal]);

  useEffect(() => {
    handleIsAccepted(false);
    console.log("공유후 일정 업데이트")
  }, [isAccepted]);

  const handleEventClick = (clickInfo) => {
    const eventId = clickInfo.event.id;
    const event = events.find(event => event.id === eventId);
  
    if (!event) {
      console.log("Could not find event with id", eventId);
      return;
    }
    setSelectedEvent(event);
    setShowEventDetailModal(true);
    // console.log(event.images);
    console.log(event);
  };
  

const handleEditClick = (event) => {
  if(event.shared) {
    console.log("단일공유수정");
    axios.patch(`http://13.209.48.48:8080/api/schedules/shared?sharedWithIds=${event.shared}`, event, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    })
    .then(response => {
      
      const newEvent = {
        ...event,
        id: response.data.id.toString(),
        start: new Date(event.startDateTime),
        end: new Date(event.endDateTime),
        content: event.event,
        allDay:event.allDay,
        alarm:event.alarm,
        alarm:event.alarmDateTime,
        
      };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      setShowAddEventModal(false);
      handleSelectedGroupEvents();
      // console.log(events);
    })
    
    .catch(error => {
      console.error(error);
    });
    
  }
  else if(event.groupId){
    console.log("그룹공유수정");
    // console.log(event.groupId);
      axios.patch(`http://13.209.48.48:8080/api/groups/${event.groupId}/schedules/${event.id}`, {
        // content:event.content,
        ...event,
        title: event.title,
        startDateTime: event.startDateTime,
        endDateTime: event.endDateTime,
        alarm:event.alarm,
        alarm:event.alarmDateTime,
      }, {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      })
      .then(response => {
        const newEvent = {
          ...event,
          id: response.data.id.toString(),
          start: new Date(event.startDateTime),
          end: new Date(event.endDateTime),
          content: event.content,
          alarm:event.alarm,
          alarm:event.alarmDateTime,
        };
        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        // console.log(events);
      })
      .catch(error => {
        console.error(error);
      });
  }

  else {
    console.log("개인일정수정");
    axios.patch(`http://13.209.48.48:8080/api/schedules/${event.id}`, event, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(response => {
      const newEvent = {
        ...event,
        id: response.data.id.toString(),
        start: new Date(event.startDateTime),
        end: new Date(event.endDateTime),
        content: event.content,
        alarm:event.alarm,
        alarm:event.alarmDateTime,
      };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      // console.log(events)
      
    })
    .catch(error => {
      console.error(error);
    });
  }
  console.log('Edit 실행');
};

const handleEditEvent=()=>{
  setShowEditEventModal(true)
}


const handleDeleteClick = (event) => {
  if(event.groupId){
    console.log("그룹일정삭제");
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
  else {
    console.log("개인일정삭제")
    axios.delete(`http://13.209.48.48:8080/api/schedules/${event.id}`, {
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
      // console.log("test");
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
              eventsUpdate={()=>{handleSelectedGroupEvents();}}
            />
          )}
    </>
  );
}

export default MyCalendar;