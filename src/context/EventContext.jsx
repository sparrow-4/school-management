import { createContext, useContext, useState, useEffect } from "react";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem("events");
    return stored ? JSON.parse(stored) : [];
  });

  /* ================= SYNC STORAGE ================= */
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  /* ================= VALIDATION ================= */
  const validateEvent = (data) => {
    const errors = {};

    if (!data.title?.trim()) {
      errors.title = "Title is required";
    }

    if (!data.description?.trim()) {
      errors.description = "Description is required";
    }

    if (!data.date) {
      errors.date = "Event date is required";
    } else {
      const selectedDate = new Date(data.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        errors.date = "Past dates are not allowed";
      }
    }

    if (!data.poster) {
      errors.poster = "Poster is required";
    }

    return errors;
  };

  /* ================= ADD EVENT ================= */
  const addEvent = (eventData) => {
  const errors = validateEvent(eventData);

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  // 🔥 DEFINE loggedStudent HERE
  const loggedStudent = JSON.parse(
    localStorage.getItem("loggedStudent")
  );

  const newEvent = {
    ...eventData,
    id: Date.now(),
    status: "pending",
    studentId: loggedStudent?.id,  
    department: loggedStudent?.className,
    createdAt: new Date().toISOString(),
  };

  setEvents((prev) => [...prev, newEvent]);

  return { success: true };
};

  /* ================= APPROVE / REJECT ================= */
  const updateEventStatus = (id, status) => {
    const loggedTeacher = JSON.parse(localStorage.getItem("loggedTeacher"));

    // Only HOD can approve/reject
    if (!loggedTeacher?.isHod) {
      return;
    }

    setEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, status } : e
      )
    );
  };

  /* ================= UPDATE EVENT ================= */
  const updateEvent = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === updatedEvent.id ? { ...e, ...updatedEvent } : e
      )
    );
  };

  /* ================= DELETE ================= */
  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        updateEventStatus,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);