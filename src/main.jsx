import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { LoadingProvider } from "./context/LoadingContext";
import { AuthProvider } from "./context/AuthContext";
import { EventProvider } from "./context/EventContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
       <LoadingProvider>
      <AuthProvider>
       <EventProvider>
         <App />
       </EventProvider>
         
      
      </AuthProvider>
    </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
