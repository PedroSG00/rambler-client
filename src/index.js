import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-widgets/styles.css";
import { BrowserRouter as Router } from 'react-router-dom';
import { MessageProviderWrapper } from './context/userMessage.context';
import { AuthProviderWrapper } from './context/auth.context';
import { MapProvider } from './context/map.context';
import { SocketProvider } from './context/socket.context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SocketProvider>
      <AuthProviderWrapper>
        <MapProvider>
          <MessageProviderWrapper>
            <Router>
              <App />
            </Router>
          </MessageProviderWrapper>
        </MapProvider>
      </AuthProviderWrapper>
    </SocketProvider>
  </React.StrictMode >
)

