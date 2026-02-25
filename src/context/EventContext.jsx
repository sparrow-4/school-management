import { createContext, useContext, useState, useEffect } from "react";

const EventContext = createContext();

export const EventProvider = ({ children }) => {

  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const validateEvent = (data) => {

    const today = new Date().toISOString().split("T")[0];
    const errors = {};

    if (!data.title?.trim()) {
      errors.title = "Title is required";
    }

    if (!data.description?.trim()) {
      errors.description = "Description is required";
    }

    if (!data.date) {
      errors.date = "Date is required";
    } 
    else if (data.date < today) {
      errors.date = "Past date not allowed";
    }

    if (!data.poster) {
      errors.poster = "Poster is required";
    }

    return errors;
  };

  const addEvent = (event) => {

    const errors = validateEvent(event);

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    const newEvent = {
      ...event,
      id: Date.now()
    };

    setEvents((prev) => [...prev, newEvent]);

    return { success: true };
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const updateEvent = (updatedEvent) => {

  const errors = validateEvent(updatedEvent);

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  setEvents((prev) =>
    prev.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    )
  );

  return { success: true };
};
  return (
    <EventContext.Provider
      value={{ events, addEvent, deleteEvent, updateEvent }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);