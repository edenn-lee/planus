import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import AddEventModal from './AddEventModal';
import EventDetailModal from './EventDetailModal.js';
import axios from 'axios';

const API_URL = 'http://15.165.204.96:8080/api/schedules';

function MyCalendar() {

  const [events, setEvents] = useState([]);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetailModal, setShowEventDetailModal] = useState(false);

  
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

  const handleAddEventSubmit = (data) => {
    console.log(events);
    const processedEvent = {
      ...data,
      duration: data.start === data.end ? 1 : undefined
    };
  
    axios.post(API_URL, data)
      .then(response => {
        console.log(data);
        console.log(response);
        const newEventId = response.data.id;
        const newEvents = [...events, { ...data, id: newEventId }];
        setEvents(newEvents);
        setShowAddEventModal(false);
      })
      .catch(error => {
        console.error(error);
      });

      console.log(events);
  };
  
  // const createEvent = (event) => {
  //   const newEventId = event.id;
  //   const newEvents = [...events, { ...event, id: newEventId }];
  //   setEvents(newEvents);
  // };

  // const processedEvents = events.map((event) => {
  //   if (event.start === event.end) {
  //     return { ...event, duration: 1 };
  //   }
  //   return event;
  // });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setEvents(response.data);
        console.log(response.data);
        console.log(events);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // console.log(events)
    setShowEventDetailModal(false);
  }, []);

  const handleEventClick = (clickInfo) => {
    const eventId = clickInfo.event.id;
    const event = events.find(event => event.id == eventId);
    if (!event) {
     console.log("야 이거 또 안된다") // event가 undefined일 때 처리할 내용
    }
    else console.log("야 이건 되는데?")

    // console.log(event);
    console.log(event);
    console.log(events);
    if (event) {
      setShowEventDetailModal(true);
      setSelectedEvent(event);
    } else {
      console.log(`Could not find event with id ${eventId}`);
      // console.log(clickInfo.event.id);
    }
  }

  const calendarOptions = {
    headerToolbar: {
      left : "prev,next today",
      center: 'title',
      right: "addEventButton",
    },
    
    customButtons: {
      addEventButton: {
        text: "일정 추가",
        click: () => setShowAddEventModal(true),
      }
    },

    titleFormat: {
      month:"long"
    },
    
    eventClick: handleEventClick
  }

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        events={events}
        {...calendarOptions}
        style={{ height: "100%", width: "100%" }}
      />

      {showAddEventModal && (
        <AddEventModal
          onAddEventSubmit={handleAddEventSubmit}
          onClose={() => setShowAddEventModal(false)}
          isOpen={showAddEventModal}
        />
      )}

      {showEventDetailModal && selectedEvent && (
        <EventDetailModal
         
          event={selectedEvent}
          onClose={() => setShowEventDetailModal(false)}
        />
      )}
    </>
  );
}

export default MyCalendar;
