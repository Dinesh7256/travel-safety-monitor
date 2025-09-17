
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Map, { Marker } from 'react-map-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Dashboard.css';

// --- IMPORTANT ---
// 1. Paste your Mapbox Access Token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGluZXNoNTk4IiwiYSI6ImNtZm9jcjdsajA0amUya3B5d3U1czNlemYifQ.rItDI_PuHVSOUvmg6lGaGQ';

// 2. Use the same IP Address and port as your backend server!
const SOCKET_URL = 'http://localhost:5003';

function App() {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 20.5937, // Centered on India
    longitude: 78.9629,
    zoom: 4,
  });

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socket.on('connect', () => console.log('Connected to WebSocket server!'));
    socket.on('new-alert', (newAlert) => {
      console.log('Received new alert:', newAlert);
      setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
    });
    return () => socket.disconnect();
  }, []);

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
    // Move map view to the alert's location
    if (alert.location && Array.isArray(alert.location.coordinates)) {
      const [lon, lat] = alert.location.coordinates;
      setViewport(v => ({
        ...v,
        latitude: lat,
        longitude: lon,
        zoom: 12,
      }));
    }
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1>Smart Tourist Safety Dashboard</h1>
        <p>Real-time Incident Monitoring</p>
      </header>

      <main className="mainContent">
        <div className="alertsSidebar">
          <h2>Live Alerts</h2>
          <div>
            {alerts.length === 0 ? (
              <div className="alertCard"><p className="detail">Waiting for alerts...</p></div>
            ) : (
              alerts.map((alert) => (
                <div key={alert._id} className="alertCard" onClick={() => handleAlertClick(alert)}>
                  <p className="title">PANIC SIGNAL</p>
                  <p className="detail">Tourist ID: {alert.touristId}</p>
                  <p className="detail">Time: {new Date(alert.createdAt).toLocaleTimeString()}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mapArea" style={{ position: 'relative', minHeight: '400px' }}>
          <Map
            initialViewState={viewport}
            mapboxAccessToken={MAPBOX_TOKEN}
            mapStyle="https://demotiles.maplibre.org/style.json"
            style={{ width: '100%', height: '100%' }}
            onMove={evt => setViewport(evt.viewState)}
          >
            {selectedAlert && selectedAlert.location && Array.isArray(selectedAlert.location.coordinates) && (
              <Marker
                latitude={selectedAlert.location.coordinates[1]}
                longitude={selectedAlert.location.coordinates[0]}
                anchor="bottom"
              >
                <div className="marker">
                  <span></span>
                </div>
              </Marker>
            )}
          </Map>
        </div>
      </main>
    </div>
  );
}

export default App;
