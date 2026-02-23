import { createContext, useContext, useState, useEffect } from "react";

const EventContext = createContext();

export const EventProvider = ({ children }) => {

    // Load from localStorage initially
    const [events, setEvents] = useState(() => {
        const savedEvents = localStorage.getItem("events");
        return savedEvents ? JSON.parse(savedEvents) : [];
    });

    // Save to localStorage whenever events change
    useEffect(() => {
        localStorage.setItem("events", JSON.stringify(events));
    }, [events]);

    // Add Event
    const addEvent = (event) => {
        setEvents((prev) => [
            ...prev,
            { ...event, id: Date.now() }
        ]);
    };

    // Delete Event
    const deleteEvent = (id) => {
        setEvents((prev) =>
            prev.filter((event) => event.id !== id)
        );
    };

    // Update Event
    const updateEvent = (updatedEvent) => {
        setEvents((prev) =>
            prev.map((event) =>
                event.id === updatedEvent.id ? updatedEvent : event
            )
        );
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