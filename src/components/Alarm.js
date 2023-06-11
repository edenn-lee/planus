import React, { useEffect } from "react";
import axios from "axios";

function Alarm({ events, onUpdateEvent }) {
    console.log(events)
    console.log("aslkdfj;alsdjfl;kas")
  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      events.forEach((event) => {
        if (event.alarm && new Date(event.alarmDateTime) < now) {
          sendAlarm(event);
        }
      });
    };

    const sendAlarm = (event) => {
      // 알람 전송을 위한 axios 요청
      axios.post("your-api-url", event).then((response) => {
        // 알람 전송 성공 시 이벤트 업데이트
        if (response.status === 200) {
          const updatedEvent = { ...event, alarm: false };
          onUpdateEvent(updatedEvent);
        }
      });
    };

    const interval = setInterval(checkAlarms, 10000); // 10초마다 알람 체크

    return () => {
      clearInterval(interval);
    };
  }, [events, onUpdateEvent]);

  return null;
}

export default Alarm;