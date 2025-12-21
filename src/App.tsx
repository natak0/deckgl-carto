import { StrictMode } from 'react';
import './App.css';
import { MapViewContainer } from './views/map/MapViewContainer.tsx';

function App() {
  return (
    <StrictMode>
      <MapViewContainer />
    </StrictMode>
  );
}

export default App;
