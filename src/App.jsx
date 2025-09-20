import React from "react";
import Routes from "./Routes";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom"; // <-- AÑADE ESTA LÍNEA

function App() {
  return (
    <BrowserRouter> {/* <-- ENVUELVE TODO CON BROWSERROUTER AQUÍ */}
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;